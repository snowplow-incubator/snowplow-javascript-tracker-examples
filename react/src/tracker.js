import { newTracker, trackPageView, enableActivityTracking } from "@snowplow/browser-tracker";
import React from 'react';
import { useLocation } from 'react-router-dom';
import { FormTrackingPlugin } from '@snowplow/browser-plugin-form-tracking';

let tracker = newTracker('ns1', 'http://localhost:9090', {
  plugins: [ FormTrackingPlugin() ]
});

enableActivityTracking({
  minimumVisitLength: 5,
  heartbeatDelay: 5
});

const useLocationChange = () => {
  const location = useLocation();
  React.useEffect(() => { 
    trackPageView();
   }, [location]);
};

export { tracker, useLocationChange };