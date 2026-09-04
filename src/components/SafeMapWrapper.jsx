// src/components/SafeMapWrapper.jsx
import React, { useState, useEffect } from 'react';

export default function SafeMapWrapper(props) {
  const [MapComponent, setMapComponent] = useState(null);

  useEffect(() => {
    // Dynamically import the map component only in the browser
    import('./DynamicMap.jsx').then((mod) => {
      setMapComponent(() => mod.default);
    });
  }, []);

  if (!MapComponent) {
    return <div>Loading map...</div>; // Render a fallback on the server
  }

  return <MapComponent {...props} />;
}
