import { enableYouTubeTracking } from "@snowplow/browser-plugin-youtube-tracking";
import React, { useEffect } from "react";

export default function YoutubeTrack() {
  const videoId = "youtube";

  useEffect(() => {
    enableYouTubeTracking({
      id: videoId,
      options: {
        captureEvents: ["DefaultEvents", "error"],
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
