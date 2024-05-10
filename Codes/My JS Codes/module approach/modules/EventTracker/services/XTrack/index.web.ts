import xtrack, { OverridedXTrack } from "xtrack";

import { XTrackConfig, XTrackServiceConstructor } from "./types";

import {
  ApiEventTrackerProperties,
  EventTracker,
  EventTrackerUser,
  GeneralEventTrackerProperties,
  NavigationEventTrackerProperties,
  SlimCustomUIEventTrackerProperties,
  UiEventTrackerProperties,
} from "../../types";

export const XTrackService: XTrackServiceConstructor<OverridedXTrack> = class extends EventTracker<OverridedXTrack> {
  service: OverridedXTrack = xtrack;

  getCurrentRoute?: () => string;

  constructor(config: XTrackConfig) {
    super();

    const { optOutTrackingDefault, token = "", getCurrentRoute } = config;
    this.getCurrentRoute = getCurrentRoute;

    try {
      this.service.init(token, {
        opt_out_tracking_by_default: optOutTrackingDefault,
      });

      console.info("XTrack is initialized successfully!");
    } catch (error) {
      console.error(
        "XTrack initialization is failed:",
        JSON.stringify(error, null, 2)
      );
    }
  }

  trackEvent({ businessEventName, ...rest }: GeneralEventTrackerProperties) {
    this.service.track(`general:${businessEventName}`, rest);
  }

  trackApiEvent({ routeName, ...rest }: ApiEventTrackerProperties) {
    this.service.track(`api:${routeName}`, rest);
  }

  trackNavigationEvent({
    routeName,
    ...rest
  }: NavigationEventTrackerProperties) {
    this.service.track(`navigation:${routeName}`, rest);
  }

  trackUiEvent({ businessEventName, ...rest }: UiEventTrackerProperties) {
    this.service.track(`ui:${businessEventName}`, rest);
  }

  async identifyUser(id: string) {
    this.service.identify(id);
  }

  setUserInfo(info: EventTrackerUser) {
    this.service.people.set(info);
  }

  setAnalyticsProps(analyticsProps?: SlimCustomUIEventTrackerProperties) {
    if (!analyticsProps) {
      return undefined;
    }

    const routeName = this.getCurrentRoute?.() || "undefined";

    return {
      ...analyticsProps,
      routeName,
    };
  }

  flush() {}
};

export { XTrackServiceConstructor, XTrackConfig } from "./types";
