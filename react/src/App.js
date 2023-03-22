import './App.css';
import { Link } from "react-router-dom";
import { useLocationChange } from './tracker';
import { enableAnonymousTracking, disableAnonymousTracking, trackStructEvent } from '@snowplow/browser-tracker';

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
    action: "action"
  });
}

function App() {
  useLocationChange();

  return (
    <div className="App">
      <h1>Welcome!</h1>
      <dl>
        <dt><Link to="/snowplow">About Snowplow</Link></dt>
        <dt><Link to="/form">Form tracking demo</Link></dt>
        <dt><Link to="/iframe_form">Form tracking demo in iframe</Link></dt>
        <dt><Link to="/youtube">Youtube video tracking from Iframe</Link></dt>
        <dt><Link to="/youtube_player">Youtube video tracking with YouTube Iframe API Player</Link></dt>
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

export default App;
