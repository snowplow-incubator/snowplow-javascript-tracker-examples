import * as plugin from "@snowplow/browser-plugin-media";

let lastAdPlayedAt = new Date().getTime() - 30 * 1000;
let adProgress = 0;

export function refreshAds(id, getPlayingAdStage, setPlayingAdStage) {
  const video = document.getElementById("movie");
  const currentTime = new Date().getTime();
  const timeDiff = currentTime - lastAdPlayedAt;

  if (getPlayingAdStage === undefined || setPlayingAdStage === undefined) {
    return;
  }
  const playingAdStage = getPlayingAdStage();

  // not playing ad yet
  if (playingAdStage === 0) {
    // is playing video and 30 seconds since last ad? then play ad
    if (!video.paused && timeDiff > 30 * 1000) {
      video.pause();

      plugin.trackMediaAdBreakStart({
        id,
        adBreak: {
          name: "break",
          breakId: `${new Date().getTime() % 1000}`,
          breakType: plugin.MediaPlayerAdBreakType.Linear,
        },
      });
      plugin.trackMediaAdStart({
        id,
        ad: {
          adId: `${new Date().getTime() % 1000}`,
          name: "Ad 1",
          creativeId: "ad-1",
          duration: 4,
          skippable: true,
        },
      });

      lastAdPlayedAt = currentTime;
      setPlayingAdStage(1);
    }
  }
  // playing ads
  else if (playingAdStage === 1 || playingAdStage === 2) {
    // end of ad
    if (adProgress === 4) {
      plugin.trackMediaAdComplete({ id });
      lastAdPlayedAt = currentTime;

      if (playingAdStage === 1) {
        plugin.trackMediaAdStart({
          id,
          ad: {
            adId: `${new Date().getTime() % 1000}`,
            name: "Ad 2",
            creativeId: "ad-2",
            duration: 4,
            skippable: true,
          },
        });

        setPlayingAdStage(2);
      } else {
        plugin.trackMediaAdBreakEnd({ id });

        setPlayingAdStage(0);
        video.play();
      }
    }
    // 3/4 playback
    else if (adProgress === 3) {
      plugin.trackMediaAdThirdQuartile({ id });
    }
    // 2/4 playback
    else if (adProgress === 2) {
      plugin.trackMediaAdMidpoint({ id });
    }
    // 1/4 playback
    else if (adProgress === 1) {
      plugin.trackMediaAdFirstQuartile({ id });
    }
  }

  adProgress = (adProgress + 1) % 5;
}

export function skipAd(id, getPlayingAdStage, setPlayingAdStage) {
  if (getPlayingAdStage === undefined) {
    return;
  }
  let playingAdStage = getPlayingAdStage();

  plugin.trackMediaAdSkip({ id });

  if (playingAdStage === 1) {
    plugin.trackMediaAdStart({
      id,
      ad: {
        adId: `${new Date().getTime() % 1000}`,
        name: "Ad 2",
        creativeId: "ad-2",
        duration: 4,
        skippable: true,
      },
    });

    adProgress = 1;
    lastAdPlayedAt = new Date().getTime();
    setPlayingAdStage(2);
  } else if (playingAdStage === 2) {
    plugin.trackMediaAdBreakEnd({ id });

    lastAdPlayedAt = new Date().getTime();
    adProgress = 0;
    setPlayingAdStage(0);

    const video = document.getElementById("movie");
    video.play();
  }
}
