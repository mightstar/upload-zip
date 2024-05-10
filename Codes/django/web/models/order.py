from api.util import cached_property
from django.db import models
from django.utils import timezone
from jsonfield import JSONField

ORDER_STATUSES = (
    ('CREATED', 'Created'),
    ('CHARGED', 'Charged'),
    ('FAILED', 'Failed'),
    ('SHIPPED', 'Shipped'),
)


class Order(models.Model):
    user = models.ForeignKey('web.User', on_delete=models.CASCADE)
    expert = models.ForeignKey('web.Expert', on_delete=models.CASCADE)

    subtotal = models.DecimalField(decimal_places=2, max_digits=10, blank=True, null=True)
    shipping = models.DecimalField(decimal_places=2, max_digits=10, blank=True, null=True)
    total = models.DecimalField(decimal_places=2, max_digits=10, blank=True, null=True)

    data = JSONField(blank=True)

    status = models.CharField(choices=ORDER_STATUSES, max_length=25)
    date_created = models.DateTimeField(default=timezone.now)

    class Meta:
        app_label = 'web'

    @cached_property
    def is_success(self):
        return not self.is_failed

    @cached_property
    def is_failed(self):
        return self.status == "FAILED"

    @cached_property
    def products(self):
        from .order_product import OrderProduct
        from .product import Product
        oproducts = [oc for oc in OrderProduct.objects.filter(order=self).prefetch_related('product')]
        Product.bulk_set_related([oc.product for oc in oproducts])
        oproducts = sorted(oproducts, key=lambda rp: rp.full_ordering)
        for p in oproducts:
            p.order = self
        return oproducts

    def as_dict(self):
        d = {
            'id': self.id,
            'user': {
                'id': self.user.id,
                'email': self.user.email,
            },
            'expert': self.expert_id,
            'status': self.status,
            'isSuccess': self.is_success,
            'isFailed': self.is_failed,
            'subtotal': self.subtotal,
            'shipping': self.shipping,
            'total': self.total,
            'data': self.data,
            'dateCreated': self.date_created,
        }

        d['products'] = [p.as_dict() for p in self.products]

        return d

    @staticmethod
    def bulk_set_related(orders):
        if not orders:
            return

        from api.util import hashby
        from .product import Product
        from .order_product import OrderProduct
        orders = list(orders)
        odict = hashby(orders)
        for u in orders:
            # preset empty/default values
            u.products = []

        oproducts = [oc for oc in OrderProduct.objects.filter(order__in=orders).prefetch_related('product')]
        pdict = hashby([oc.product for oc in oproducts])
        Product.bulk_set_related(pdict.values())

        for op in oproducts:
            op.product = pdict[op.product_id]  # set fully loaded product
            if op.order_id in odict:
                odict[op.order_id].products.append(op)

        for o in odict.values():
            o.products = sorted(o.products, key=lambda op: op.full_ordering)
