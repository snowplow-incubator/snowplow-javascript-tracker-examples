import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import { startVimeoTracking } from "@snowplow/browser-plugin-vimeo-tracking";
import CreateTrackerWrapper from "../createTrackerWrapper";
import MediaEvents from "../components/mediaEvents";
import { vimeoSchemas } from "../constants";

function VimeoIframe() {
  const id = uuidv4();
  const iframeRef = useRef(null);

  useEffect(() => {
    startVimeoTracking({
      video: iframeRef.current,
      id,
      boundaries: [50],
    });
  }, [id]);

  return (
    <>
      <iframe
        ref={iframeRef}
        id="vimeo"
        width={640}
        height={360}
        src="https://player.vimeo.com/video/808787686?h=3044aad004"
        title="Vimeo Example"
        allowFullScreen
      ></iframe>
      <MediaEvents schemas={vimeoSchemas} />
    </>
  );
}

function Wrapped() {
  return (
    <CreateTrackerWrapper>
      <VimeoIframe />
    </CreateTrackerWrapper>
  );
}

export default Wrapped;
