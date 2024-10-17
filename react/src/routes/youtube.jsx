import { startYouTubeTracking } from "@snowplow/browser-plugin-youtube-tracking";
import React, { useEffect } from "react";
import CreateTrackerWrapper from "../createTrackerWrapper";

function YoutubeTrack() {
  const videoId = "youtube";

  useEffect(() => {
    startYouTubeTracking({
      id: "youtube",
      captureEvents: ["DefaultEvents", "error", "ping"],
      video: videoId,
      pings: {
        pingInterval: 5,
      },
    });
  }, []);

  return (
    <iframe
      id={videoId}
      width="560"
      height="315"
      src="https://www.youtube.com/embed/zSM4ZyVe8xs"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}

function Wrapped() {
  return (
    <CreateTrackerWrapper>
      <YoutubeTrack />
    </CreateTrackerWrapper>
  );
}

export default Wrapped;
