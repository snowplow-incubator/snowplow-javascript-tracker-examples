function afterTrack(payload) {
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
}

export default function CaptureTrackedEventsPlugin() {
  return {
    afterTrack,
  };
}
