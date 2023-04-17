import { useLocationChange } from '../tracker';
import Video from '../components/video';
import MediaEvents from '../components/mediaEvents';
import CreateTrackerWrapper from "../createTrackerWrapper";

function Media() {
  useLocationChange();
  return (
    <div className="App">
      <Video />

      <MediaEvents />
    </div>
  );
}

function Wrapped() {
  return (
    <CreateTrackerWrapper>
      <Media />
    </CreateTrackerWrapper>
  );
}

export default Wrapped;
