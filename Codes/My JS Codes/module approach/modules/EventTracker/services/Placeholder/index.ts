import { EventTracker } from '@modules/EventTracker/types';

/**
 * We need this service to have an ability to disable the EventTracker. Having PlaceholderService we won't have to comment EventTracker's functions calls
 */
export class EventTrackerPlaceholder implements EventTracker {
  trackEvent() {}

  trackApiEvent() {}

  trackNavigationEvent() {}

  trackUiEvent() {}

  async identifyUser() {
    return;
  }

  setUserInfo() {}

  setAnalyticsProps(_analyticsProps: unknown) {
    return undefined;
  }

  flush() {}
}
