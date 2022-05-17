import { useLocationChange } from '../tracker';
import { Link } from "react-router-dom";

export default function Snowplow() {
  useLocationChange();
  return (
    <div className="App">
      <h1>Snowplow</h1>
      <p>
        Snowplow is a scalable open-source platform for rich, high quality, low-latency data collection. It is designed to collect high quality, complete behavioral data for enterprise business.
      </p>
      <p>
        <Link to="/">Go back</Link>
      </p>
    </div>
  );
}
