import {
  EventTracker,
  EventTrackerConfig,
  eventTrackerMapper,
  EventTrackerPlaceholder,
} from "@modules";

import { InitializationConfig } from "./types";

export class AnalyticsService {
  private static isInitialized = false;

  static eventTracker: EventTracker = new EventTrackerPlaceholder();

  static initialize = (config: InitializationConfig = {}) => {
    const { eventTrackerConfig } = config;

    if (!this.isInitialized) {
      this.initializeEventTracker(eventTrackerConfig);
    }

    this.isInitialized = true;
  };

  private static initializeEventTracker(config?: EventTrackerConfig) {
    if (config) {
      const { name, config: serviceConfig } = config;
      const Service = eventTrackerMapper[name];

      AnalyticsService.eventTracker = new Service(serviceConfig);
    }
  }
}
