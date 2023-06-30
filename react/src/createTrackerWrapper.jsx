import './App.css';
import { initializeTracker, isTrackerInitialized } from './tracker';
import { useState } from "react";

function submitForm(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData.entries());

  const endpoint = formValues.endpoint;
  if (!endpoint) {
    alert("Please enter a collector endpoint URI");
    return false;
  }

  initializeTracker(endpoint);
  localStorage.setItem("endpoint", endpoint);

  return true;
}

function CreateTrackerWrapper({ children }) {
  const [initialized, setInitialized] = useState(isTrackerInitialized());

  if (initialized) {
    return children;
  }

  return (
    <div className="App">
      <h1>Snowplow JavaScript Tracker Demo</h1>

      <p>This is a demo of the browser tracker in a React app.</p>

      <p>Use the form below to configure the tracker.</p>

      <hr />

      <form
        onSubmit={(event) => {
          if (submitForm(event)) {
            setInitialized(true);
          }
        }}
      >
        <p>
          <label htmlFor="endpoint">
            <strong>Collector endpoint URI</strong> (you may use{" "}
            <a href="https://docs.snowplow.io/docs/getting-started-with-micro/what-is-micro/">
              Snowplow Micro
            </a>{" "}
            over <a href="https://ngrok.com/">ngrok</a>):
          </label>
          <input
            type="text"
            id="endpoint"
            name="endpoint"
            size="50"
            placeholder="https://xxxx.ngrok-free.app"
            defaultValue={localStorage.getItem("endpoint")}
          />
        </p>

        <p>
          <input className="button" type="submit" value="Create tracker" />
          &nbsp;
          <button
            className="button"
            onClick={() => {
              initializeTracker("http://localhost:9090");
              setInitialized(true);
            }}
          >
            Skip
          </button>
        </p>
      </form>
    </div>
  );
}

export default CreateTrackerWrapper;
