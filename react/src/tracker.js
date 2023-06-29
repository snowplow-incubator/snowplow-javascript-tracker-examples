import {
  newTracker,
  trackPageView,
  enableActivityTracking,
} from "@snowplow/browser-tracker";
import React from "react";
import { useLocation } from "react-router-dom";
import { FormTrackingPlugin } from "@snowplow/browser-plugin-form-tracking";
import { YouTubeTrackingPlugin } from "@snowplow/browser-plugin-youtube-tracking";
import { VimeoTrackingPlugin } from "@snowplow/browser-plugin-vimeo-tracking";
import { SnowplowMediaPlugin } from "@snowplow/browser-plugin-media";
import CaptureTrackedEventsPlugin from "./plugins/captureTrackedEventsPlugin";

var tracker;

const initializeTracker = (endpoint) => {
  tracker = newTracker("ns1", endpoint, {
    plugins: [
      FormTrackingPlugin(),
      YouTubeTrackingPlugin(),
      VimeoTrackingPlugin(),
      SnowplowMediaPlugin(),
      CaptureTrackedEventsPlugin(),
    ],
  });

  enableActivityTracking({
    minimumVisitLength: 5,
    heartbeatDelay: 5,
  });
};

const useLocationChange = () => {
  const location = useLocation();
  React.useEffect(() => {
    trackPageView();
  }, [location]);
};

const isTrackerInitialized = () => tracker !== undefined;

export { tracker, initializeTracker, useLocationChange, isTrackerInitialized };
