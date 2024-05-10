import { ApplicationName } from '@constants';

enum ApiStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

enum ApiMethod {
  QUERY = 'query',
  MUTATION = 'mutation',
  SUBSCRIPTION = 'subscription',
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface EventTrackerCommonConfig {
  token: string;
  applicationName: `${ApplicationName}`;
}

// This type is used for predefined properties inside every component from the lotic-ui-library
export interface BaseUiEventTrackerProperties {
  eventName: string;
  componentName: string;
}

// This type is used for "business" properties that are passed to the lotic-ui-library components from the primary apps
export interface CustomUiEventTrackerProperties {
  businessEventName: string;
  routeName: string;
  data?: string;
}

// This type is used for tracking "business" properties, where routeName is added programmatically
export type SlimCustomUIEventTrackerProperties = Omit<CustomUiEventTrackerProperties, 'routeName'>;

export type UiEventTrackerProperties = BaseUiEventTrackerProperties &
  CustomUiEventTrackerProperties;

export type GeneralEventTrackerProperties = {
  businessEventName: string;
};

export type ApiEventTrackerProperties = {
  routeName: string;
  status: `${ApiStatus}`;
  method?: `${ApiMethod}`;
  statusCode?: number;
  queryDetails?: string;
  errors?: string;
};

export type NavigationEventTrackerProperties = {
  eventName: string;
  routeName: string;
  data?: string;
};

export type EventTrackerProperties =
  | UiEventTrackerProperties
  | ApiEventTrackerProperties
  | NavigationEventTrackerProperties
  | GeneralEventTrackerProperties;

export abstract class EventTracker<Service = unknown> {
  protected abstract service?: Service;

  protected abstract getCurrentRoute?: () => string;
  abstract trackEvent(eventProperties: GeneralEventTrackerProperties): void;
  abstract trackApiEvent(eventProperties: ApiEventTrackerProperties): void;
  abstract trackUiEvent(eventProperties: UiEventTrackerProperties): void;
  abstract trackNavigationEvent(eventProperties: NavigationEventTrackerProperties): void;
  abstract identifyUser(id: string): Promise<void>;
  abstract setUserInfo(info: EventTrackerUser): void;
  abstract setAnalyticsProps(
    analyticsProps?: SlimCustomUIEventTrackerProperties,
  ): CustomUiEventTrackerProperties | undefined;
  abstract flush(): void;
}

export interface EventTrackerConstructor<
  Service,
  Config extends EventTrackerCommonConfig = EventTrackerCommonConfig,
> {
  new (config: Config): EventTracker<Service>;
}

export type EventTrackerUser = Record<string, string | number>;
