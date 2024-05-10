import json
import stripe
import random
import math
from datetime import datetime, timedelta
from decimal import Decimal

from rest_framework.views import APIView
from rest_framework.response import Response

from django.utils import timezone

from api.models import Application, Token
from api.util import (
    URLS, VERSION, Param, ViewView, _login_user,
    auth_checked, auth_required, random_obj, register,
    response_json, spec,
)
from django.conf import settings
from django.db.models import Q

from web import apis as web_apis
from web.utils import TIME, SHIPBOB_SANDBOX, SHIPBOB
from web.models import (
    Tag, TagCategory, FAQ, ActionLog, Attribute, Block, Blockster, Brand, Ingredient,
    ChangePassword, Consultation, Expert, LabNote,
    Product, Recommendation, Referral, VoucherCode,
    User, UserPhoto, ProductGroup, ProductCredit, Membership, Purchase, PromoCode, ImageSet, LabNoteAuthor, Training
)
from web.utils import (
    ACUITY, CONTACT_LISTS, ZENDESK, STATUS, FAKE_SKIN_QUIZ_VALUES,
    Mailjet, glossary_logger, can_use_product, snake_to_camel_attr, round_down, calculate_age)

@register("orders/{order_id}")
class OrderView(ViewView):
    GET = {
        'description': 'Order editing',
    }

    @auth_required
    def get(self, request, order_id):
        try:
            order = Block.objects.get(id=order_id)
        except Block.DoesNotExist:
            return 404, {
                "msg": "Not found"
            }

        if not request.user.is_staff:
            return 403, {
                "msg": "Not possible"
            }

        return True, {
            'order': order.as_dict(related=True),
        }

    PUT = {
        'description': 'Order editing',
    }

    @auth_required
    def put(self, request, order_id):
        try:
            order = Block.objects.get(id=order_id)
        except Block.DoesNotExist:
            return 404, {
                "msg": "Not found"
            }

        if not request.user.is_staff:
            return 403, {
                "msg": "Not possible"
            }

        if 'status' in request.data:
            order.data['status'] = request.data['status']
            if order.data['status'] == 'SHIPPED':
                order.date_completed = timezone.now()
                ActionLog.log(
                    order.user,
                    'order_shipped',
                    extra=f"Order #{order.id}",
                    payload={
                        "id": order.id
                    }
                )

        order.save()

        return True, {
            'order': order.as_dict(),
        }




@register("orders")
class OrdersView(ViewView):
    POST = {
        "description": "Submit an order",
        "parameters": [],
    }

    @auth_required
    def post(self, request):
        is_samples_order = request.data.get('samples', False)
        block = Blockster.create(
            request.user,
            Block.SAMPLES_ORDER_PAID if is_samples_order else Block.ORDER
        )
        block.data.update(request.data)
        qs = request.data.get('quantities', {})
        block.data['quantities'] = {f"{pid}": int(qs.get(str(pid), '1')) for pid in block.data['products']}
        block.data['products'] = [{ "id": p } for p in block.data['products']]

        ActionLog.log(
            request.user,
            'order_created',
            f'#{block.id}'
        )

        # is_success, stripe_response = web_apis.stripe_purchase(
        #     request.data['paymentMethod'],
        #     request.data['calcs']['total'],
        #     f'Product Order #{block.id}',
        # )

        purchase = Purchase.make(
            request.user, request.data['calcs']['total'],
            purchase_description=f'Product Order #{block.id}',
            customer=request.user.stripe_customer_id,
            payment_method=request.data['paymentMethod'],
            future_usage=True,
            data={'form_data': request.data},
        )
        block.data['stripeResponse'] = purchase.data['stripe_response']

        if purchase.is_success:
            block.data['status'] = 'CHARGED'
            request.user.stripe = {
                'customer': request.user.stripe_customer_id,
                'payment_method': request.data['paymentMethod'],
            }
            request.user.save()
            number_of_products = 0
            for x in block.data['quantities'].values():
                number_of_products += x
            ActionLog.log(
                request.user,
                'order_charged',
                extra=f'#{block.id}',
                payload={
                    'numberOfProduct': str(number_of_products),
                    'creditUserEarned': str(round_down(Decimal(request.data['calcs']['total']) / Decimal('10'))),
                    'product_list': json.dumps(block.data['products'])
                }
            )
            ProductCredit.use(request.user, Decimal('-1') * Decimal(request.data['calcs']['credit']))
            # add membership credit
            if request.user.is_active_member and request.user.status != STATUS.MEMBERSHIP_PAUSED:
                ProductCredit.make(
                    request.user,
                    round_down(
                        Decimal(request.data['calcs']['total']) / Decimal('10')
                    )
                )
            if request.data.get('clearCart', False):
                request.user.empty_cart()
                request.user.save()
        else:
            block.data['status'] = 'FAILED'
            ActionLog.log(
                request.user,
                'order_failed',
                f"#{block.id}: {block.data['stripeResponse']}"
            )

        block.save_as_completed()

        request.user.sync(from_where='order')

        sb_error = None
        try:
            if purchase.is_success and not is_samples_order:
                SHIPBOB.make_order(block)
        except Exception as e:
            sb_error = e
            ActionLog.log(
                request.user,
                'shipbob_issue',
                extra=f'#{block.id}',
                payload={
                    'sbError': f"sb_error={sb_error}"
                }
            )

        return True, {
            'order': block.as_dict(),
            'viewer': request.user.as_dict(related=True),
            'error': block.data['stripeResponse'] if not purchase.is_success else None,
            'sbError': f"sb_error={sb_error}"
        }

