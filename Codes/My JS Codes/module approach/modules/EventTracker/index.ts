import { EventTrackerServiceName } from "./constants";
import { EventTrackerMapper, XTrackService } from "./services";

export const eventTrackerMapper: EventTrackerMapper = {
  [EventTrackerServiceName.XTRACK]: XTrackService,
};

export * from "./services";
export {
  EventTrackerConstructor,
  EventTracker,
  BaseUiEventTrackerProperties,
  CustomUiEventTrackerProperties,
} from "./types";
export { EventTrackerServiceName } from "./constants";
