import React, { useEffect, useState } from "react";
import * as plugin from "@snowplow/browser-plugin-media";
import "./video.css";
import { refreshAds, skipAd } from "./adHelpers";
import { v4 as uuid } from 'uuid';

let id; // unique for each video playback (each startMediaTracking call)

function Video() {
  let getPlayingAdStage;
  let setPlayingAdStage;

  useEffect(() => {
    console.log("start media tracking");
    id = uuid();
    plugin.startMediaTracking({
      id,
      player: getPlayer(),
      pings: true,
      boundaries: [25, 50, 75]
    });

    const adInterval = setInterval(() => {
      refreshAds(id, getPlayingAdStage, setPlayingAdStage);
    }, 1000);

    return function cleanup() {
      console.log("end media tracking");
      clearInterval(adInterval);
      plugin.endMediaTracking({ id });
    };
  });

  return (
    <div className="outer-container">
      <div className="inner-container">
        <video
          id="movie"
          width="600"
          controls
          onPlay={function () {
            plugin.trackMediaPlay({ id, player: getPlayer(this) });
          }}
          onPlaying={function () {
            plugin.updateMediaTracking({ id, player: getPlayer(this) });
          }}
          onPause={function () {
            plugin.trackMediaPause({ id, player: getPlayer(this) });
          }}
          onEnded={function () {
            plugin.trackMediaEnd({ id, player: getPlayer(this) });
          }}
          onTimeUpdate={function () {
            plugin.updateMediaTracking({ id, player: getPlayer(this) });
          }}
          onAbort={() => {}}
          onCanPlay={() => {}}
          onCanPlayThrough={() => {}}
          onDurationChange={() => {}}
          onEmptied={() => {}}
          onError={function () {
            plugin.trackMediaError({
              id,
              errorDescription: "Error loading video",
              player: getPlayer(this),
            });
          }}
          onLoadedData={() => {}}
          onLoadedMetadata={() => {}}
          onLoadStart={() => {}}
          onProgress={() => {}} // Fired periodically as the browser loads a resource
          onRateChange={function () {
            let player = getPlayer(this);
            plugin.trackMediaPlaybackRateChange({
              id,
              newRate: player.playbackRate,
              player: player,
            });
          }}
          onSeeked={function () {
            plugin.trackMediaSeekEnd({ id, player: getPlayer(this) });
          }}
          // Note: not tracking the the `seeking` event as seek start because it is fired after seeking starts when the current time of the video is already changed.
          // onSeeking={function () {
          //   plugin.trackMediaSeekStart({ id, player: getPlayer(this) });
          // }}
          onStalled={() => {}}
          onSuspend={() => {}}
          onVolumeChange={function () {
            let player = getPlayer(this);
            plugin.trackMediaVolumeChange({
              id,
              newVolume: player.volume,
              player: player,
            });
          }}
          onWaiting={function () {
            plugin.trackMediaBufferStart({ id, player: getPlayer(this) });
          }}
        >
          <source
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
        </video>

        <Ad
          callback={(update) => {
            getPlayingAdStage = update.getPlayingAdStage;
            setPlayingAdStage = update.setPlayingAdStage;
          }}
          skipAd={() => skipAd(id, getPlayingAdStage, setPlayingAdStage)}
        />
      </div>
    </div>
  );
}

function Ad({ callback, skipAd }) {
  const [playingAdStage, setPlayingAdStage] = useState(0);

  callback({
    setPlayingAdStage: (playingAdStage) => {
      setPlayingAdStage(playingAdStage);
    },
    getPlayingAdStage: () => playingAdStage,
  });

  if (playingAdStage > 0) {
    return (
      <div className="video-overlay">
        <h1>Playing ad #{playingAdStage}</h1>

        <button onClick={skipAd}>Skip ad</button>
        <br />
        <button
          onClick={() => plugin.trackMediaAdClick({ id, player: getPlayer() })}
        >
          Click ad
        </button>
      </div>
    );
  } else {
    return null;
  }
}

function getPlayer(el) {
  let video = el ?? document.getElementById("movie");

  let a = {
    label: 'Bugs Bunny',
    mediaType: 'video',
    playerType: 'html5',
    currentTime: video?.currentTime ?? 0,
    duration: video?.duration,
    muted: video?.muted,
    loop: video?.loop,
    paused: video?.paused,
    ended: video?.ended,
    playbackRate: video?.playbackRate,
    volume: (video?.muted ?? false) ? 0 : video?.volume * 100,
  };
  return a;
}

export default Video;
