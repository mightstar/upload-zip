import { XTrackConfig, XTrackServiceConstructor } from "./XTrack";

import { EventTrackerServiceName } from "../constants";

/**
 * Structure example:
 *  {
 *     [EventTrackerServiceName.PLACEHOLDER]: IPlaceholderService;
 *    [EventTrackerServiceName.XTRACK]: XTrackServiceConstructor;
 *  }
 */
export interface EventTrackerMapper {
  [EventTrackerServiceName.XTRACK]: XTrackServiceConstructor;
}

/**
 * Structure example:
 *  | { name: `${EventTrackerServiceName.XTRACK}`; config: XTrackConfig }
 *  | { name: `${EventTrackerServiceName.PLACEHOLDER}`; config: IPlaceholderConfig };
 */
export type EventTrackerConfig = {
  name: `${EventTrackerServiceName.XTRACK}`;
  config: XTrackConfig;
};
