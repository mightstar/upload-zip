import { EventTrackerCommonConfig, EventTrackerConstructor } from "../../types";

export interface XTrackConfig extends EventTrackerCommonConfig {
  logging?: boolean;
  getCurrentRoute?: () => string;
  optOutTrackingDefault?: boolean;
  trackAutomaticEvents?: boolean;
}

export type XTrackServiceConstructor<Service = never> = EventTrackerConstructor<
  Service,
  XTrackConfig
>;
