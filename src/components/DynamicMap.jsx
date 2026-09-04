import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for missing default marker icons in Leaflet standard builds
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

export default function DynamicMap() {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dynamic multiple points from Astro API route
    fetch('/api/locations.json')
      .then((res) => res.json())
      .then((data) => {
        setPoints(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching map data:", err));
  }, []);

  if (loading) return <div>Loading Map Data...</div>;

  return (
    <MapContainer 
      center={[37.8, -96]} // Geocenter of USA
      zoom={4} 
      style={{ height: "500px", width: "100%", borderRadius: "8px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((point) => (
        <Marker key={point.id} position={[point.lat, point.lng]}>
          <Popup>
            <strong>{point.name}</strong> <br />
            State: {point.state} <br />
            {point.details}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
