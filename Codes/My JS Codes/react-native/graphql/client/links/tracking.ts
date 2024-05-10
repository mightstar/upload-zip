import { ApolloLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { AnalyticsService } from '@modules/analytics-service';

import config from 'config';
import { FieldNode } from 'graphql';

export const trackingLink = new ApolloLink((operation, forward) => {
  if (!config.tracking.isActive) {
    return forward(operation);
  }

  return forward(operation).map(response => {
    const { errors } = response;

    // we can't use operation.operationName since it doesn't return for all queries
    const mainDefinition = getMainDefinition(operation?.query);
    const operationName = (mainDefinition.selectionSet?.selections[0] as FieldNode)?.name.value;

    AnalyticsService.eventTracker.trackApiEvent({
      routeName: operationName ?? 'undefinedRoute',
      status: errors ? 'error' : 'success',
      method: mainDefinition?.operation || undefined,
      queryDetails: operationName ? undefined : JSON.stringify(operation.query),
      errors: JSON.stringify(errors),
    });
    return response;
  });
});
