import React, { useEffect } from "react";
import Player from "@vimeo/player";
import { v4 as uuidv4 } from "uuid";
import CreateTrackerWrapper from "../createTrackerWrapper";
import MediaEvents from "../components/mediaEvents";

import { startVimeoTracking } from "@snowplow/browser-plugin-vimeo-tracking";
import { vimeoSchemas } from "../constants";

function VimeoPlayer() {
  const vimeoPlayer = React.useRef(null);
  useEffect(() => {
    const player = new Player(vimeoPlayer.current);
    const id = uuidv4();

    player.addCuePoint(2.5, { helloMatus: "bar" });

    startVimeoTracking({
      video: player,
      id,
      boundaries: [50],
    });
  }, []);

  return (
    <>
      <div
        ref={vimeoPlayer}
        id="vimeo"
        data-vimeo-url="https://player.vimeo.com/video/808787686?h=3044aad004"
      ></div>
      <MediaEvents schemas={vimeoSchemas} />
    </>
  );
}

function Wrapped() {
  return (
    <CreateTrackerWrapper>
      <VimeoPlayer />
    </CreateTrackerWrapper>
  );
}

export default Wrapped;
