import { ApolloLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { AnalyticsService } from "some-analytics-service";

import config from "config";
import { FieldNode } from "graphql";

export const trackingLink = new ApolloLink((operation, forward) => {
  if (config.tracking.active) {
    return forward(operation).map((response) => {
      const { errors } = response;

      // we can't use operation.operationName since it doesn't return the name for all operations
      const mainDefinition = getMainDefinition(operation?.query);
      const operationName = (
        mainDefinition.selectionSet?.selections[0] as FieldNode
      )?.name.value;
      const errorMessages = errors?.map((error) => error.message).join(", ");
      const method =
        mainDefinition.kind === "OperationDefinition"
          ? mainDefinition.operation
          : undefined;

      AnalyticsService.eventTracker.trackApiEvent({
        routeName: operationName ?? "undefinedRoute",
        status: errors ? "error" : "success",
        method,
        queryDetails: operationName
          ? undefined
          : JSON.stringify(operation.query),
        errors: errorMessages,
      });

      return response;
    });
  }

  return forward(operation);
});
