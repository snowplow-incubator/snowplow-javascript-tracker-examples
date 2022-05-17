import './App.css';
import { Link } from "react-router-dom";
import { useLocationChange } from './tracker';

function App() {
  useLocationChange();

  return (
    <div className="App">
      <h1>Welcome!</h1>
      <dl>
        <dt><Link to="/snowplow">About Snowplow</Link></dt>
        <dt><Link to="/form">Form tracking demo</Link></dt>
        <dt><Link to="/iframe_form">Form tracking demo in iframe</Link></dt>
      </dl>
    </div>
  );
}

export default App;
