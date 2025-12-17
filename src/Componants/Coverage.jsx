import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Coverage = () => {
  
  const [map, setMap] = useState(null);
  const [serviceCenters, setServiceCenters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const defaultPosition = [23.685, 90.3563];

  useEffect(() => {
    fetch("/ServiceCenters.json")
      .then((res) => res.json())
      .then((data) => setServiceCenters(data))
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (serviceCenters.length === 0) return;

    const districtName = searchTerm.trim().toLowerCase();
    
    const center = serviceCenters.find(
      (c) => c.district.toLowerCase() === districtName
    );

    if (center && map) {
      map.flyTo([center.latitude, center.longitude], 12, {
        duration: 2,
      });
    } else {
      alert("District not found! Please check the spelling.");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-5xl mb-6">We are available in 64 districts</h2>

      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="search"
          placeholder="Search district"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full max-w-md border p-2 rounded"
        />
        <button type="submit" className="ml-2 btn btn-primary p-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </form>

      <div className="border w-full h-[600px]">
        <MapContainer
          center={defaultPosition}
          zoom={7}
          scrollWheelZoom={true}
          className="h-full w-full"
          ref={setMap} 
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceCenters.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <div className="p-1">
                  <strong className="text-lg">{center.district}</strong>
                  <p className="mt-1"><b>Areas:</b> {center.covered_area.join(", ")}</p>
                  <p className="italic text-blue-600">{center.gratitude}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;