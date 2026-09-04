import { useEffect, useState } from 'react';

export default function DynamicMap() {
  const [MapComponents, setMapComponents] = useState(null);

  useEffect(() => {
    // Dynamically import Leaflet and React-Leaflet only on the client side
    Promise.all([
      import('leaflet'),
      import('react-leaflet')
    ]).then(([leaflet, reactLeaflet]) => {
      // Fix for Leaflet default marker icons in React (optional but usually needed)
      delete leaflet.Icon.Default.prototype._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: '/images/marker-icon-2x.png',
        iconUrl: '/images/marker-icon.png',
        shadowUrl: '/images/marker-shadow.png',
      });

      setMapComponents(reactLeaflet);
    });
  }, []);

  if (!MapComponents) {
    return <div>Loading Map...</div>; // Render a fallback while loading on client
  }

  // Destructure the components you need from the resolved module
  const { MapContainer, TileLayer, Marker, Popup } = MapComponents;

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}
