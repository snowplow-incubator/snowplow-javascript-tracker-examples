function afterTrack(payload) {
  console.log(payload);
  if (payload.ue_pr && payload.co) {
    let event = JSON.parse(payload.ue_pr);
    let context = JSON.parse(payload.co);

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
