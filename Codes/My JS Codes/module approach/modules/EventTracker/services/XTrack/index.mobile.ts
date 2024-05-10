import { XTrack } from "xtrack";

import {
  ApiEventTrackerProperties,
  EventTracker,
  EventTrackerUser,
  GeneralEventTrackerProperties,
  NavigationEventTrackerProperties,
  SlimCustomUIEventTrackerProperties,
  UiEventTrackerProperties,
} from "@modules/EventTracker/types";

import { XTrackConfig, XTrackServiceConstructor } from "./types";

export const XTrackService: XTrackServiceConstructor<XTrack> = class extends EventTracker<XTrack> {
  service: XTrack;

  getCurrentRoute?: () => string;

  constructor(config: XTrackConfig) {
    super();

    const {
      token = "",
      logging = true,
      optOutTrackingDefault = false,
      trackAutomaticEvents = false,
      applicationName,
      getCurrentRoute,
    } = config;

    this.getCurrentRoute = getCurrentRoute;
    this.service = new XTrack(token, trackAutomaticEvents);

    try {
      void this.service.init(optOutTrackingDefault, { applicationName });
      this.service.setLoggingEnabled(logging);

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
    await this.service.identify(id);
  }

  setUserInfo(info: EventTrackerUser) {
    this.service.getPeople().set(info);
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

  flush() {
    this.service.flush();
  }
};

export { XTrackServiceConstructor, XTrackConfig } from "./types";
