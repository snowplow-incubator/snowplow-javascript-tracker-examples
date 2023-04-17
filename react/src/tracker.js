import {
  newTracker,
  trackPageView,
  enableActivityTracking,
} from "@snowplow/browser-tracker";
import React from "react";
import { useLocation } from "react-router-dom";
import { FormTrackingPlugin } from "@snowplow/browser-plugin-form-tracking";
import { YouTubeTrackingPlugin } from "@snowplow/browser-plugin-youtube-tracking";
import { SnowplowMediaPlugin } from "@snowplow/browser-plugin-media";

var tracker;

const initializeTracker = (endpoint) => {
  tracker = newTracker("ns1", "http://localhost:9090", {
    plugins: [
      FormTrackingPlugin(),
      YouTubeTrackingPlugin(),
      SnowplowMediaPlugin(),
      {
        afterTrack: (payload) => {
          console.log(payload);
          if (payload.ue_px && payload.cx) {
            let event = JSON.parse(atob(payload.ue_px));
            let context = JSON.parse(atob(payload.cx));

            window.dispatchEvent(
              new CustomEvent("spEvent", {
                detail: { id: payload.eid, event: event, context: context },
              })
            );
          }
        },
      },
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
