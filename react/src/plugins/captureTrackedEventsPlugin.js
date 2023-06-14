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

/**
 * A tracker plugin that captures tracked events and dispatches them to the window.
 * This is used internally in the app to display the tracked events in the UI.
 * @returns {object} Plugin object.
 */
export default function CaptureTrackedEventsPlugin() {
  return {
    afterTrack,
  };
}
