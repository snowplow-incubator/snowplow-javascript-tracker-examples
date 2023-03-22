import { enableYouTubeTracking } from "@snowplow/browser-plugin-youtube-tracking";
import React, { useEffect } from "react";

function loadVideoAndTrack(elemId, videoId) {
  new window.YT.Player(elemId, {
    videoId,
    events: {
      onReady: (e) =>
        enableYouTubeTracking({
          // `e.target` is the instance of `YT.Player` created
          id: e.target,
          options: { captureEvents: ["DefaultEvents", "error"] },
        }),
    },
  });
}

function loadYouTubeIframeAPI(elemId, videoId) {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";

  // onYouTubeIframeAPIReady loads the video after the script is loaded
  window.onYouTubeIframeAPIReady = () => loadVideoAndTrack(elemId, videoId);

  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

export default function YoutubeTrack() {
  const elemId = "youtube";
  const videoId = "zSM4ZyVe8xs";

  useEffect(() => {
    if (!window.YT) {
      loadYouTubeIframeAPI(elemId, videoId);
    } else {
      loadVideoAndTrack(elemId, videoId);
    }
  }, []);

  return <div id={elemId}></div>;
}
