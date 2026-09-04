// You can fetch this from a real DB or API dynamically
const locationsData = [
  { id: 1, name: "Austin Tech Hub", state: "TX", lat: 30.2672, lng: -97.7431, details: "500 Employees" },
  { id: 2, name: "Houston Logistics Center", state: "TX", lat: 29.7604, lng: -95.3698, details: "1,200 Employees" },
  { id: 3, name: "Dallas Finance Office", state: "TX", lat: 32.7767, lng: -96.7970, details: "350 Employees" },
  { id: 4, name: "Los Angeles Studio", state: "CA", lat: 34.0522, lng: -118.2437, details: "800 Employees" },
  { id: 5, name: "San Francisco HQ", state: "CA", lat: 37.7749, lng: -122.4194, details: "2,500 Employees" }
];

export async function GET() {
  return new Response(JSON.stringify(locationsData), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
