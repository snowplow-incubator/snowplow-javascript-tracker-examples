import './App.css';
import { Link } from "react-router-dom";
import { useLocationChange } from './tracker';
import { enableAnonymousTracking, disableAnonymousTracking, trackStructEvent } from '@snowplow/browser-tracker';
import CreateTrackerWrapper from "./createTrackerWrapper";
import { getPath } from './helpers';

function handleEnableAnonymousTracking() {
  enableAnonymousTracking({
    options: { withServerAnonymisation: true },
  });
}

function handleEnableAnonymousTrackingWithSessionTracking() {
  enableAnonymousTracking({
    options: { withSessionTracking: true },
  });
}

function handleDisableAnonymousTracking() {
  disableAnonymousTracking();
}

function handleTrackStructuredEvent() {
  trackStructEvent({
    category: "category",
    action: "action",
  });
}

function App() {
  useLocationChange();

  return (
    <div className="App">
      <h1>Welcome!</h1>
      <dl>
        <dt><Link to={getPath("snowplow")}>About Snowplow</Link></dt>
        <dt><Link to={getPath("form")}>Form tracking demo</Link></dt>
        <dt><Link to={getPath("iframe_form")}>Form tracking demo in iframe</Link></dt>
        <dt><Link to={getPath("youtube")}>Youtube video tracking from Iframe</Link></dt>
        <dt><Link to={getPath("youtube_player")}>Youtube video tracking with YouTube Iframe API Player</Link></dt>
        <dt><Link to={getPath("vimeo_iframe")}>Vimeo tracking from Iframe</Link></dt>
        <dt><Link to={getPath("vimeo_player")}>Vimeo tracking with Vimeo Player</Link></dt>
        <dt><Link to={getPath("media")}>Custom media tracking demo</Link></dt>
      </dl>

      <p>
        <button onClick={handleEnableAnonymousTracking}>Enable anonymous tracking</button>
        &nbsp;
        <button onClick={handleEnableAnonymousTrackingWithSessionTracking}>Enable anonymous tracking with session tracking</button>
        &nbsp;
        <button onClick={handleDisableAnonymousTracking}>Disable anonymous tracking</button>
      </p>

      <p>
        <button onClick={handleTrackStructuredEvent}>Track a structured event</button>
      </p>
    </div>
  );
}

function Wrapped() {
  return (
    <CreateTrackerWrapper>
      <App />
    </CreateTrackerWrapper>
  );
}

export default Wrapped;
