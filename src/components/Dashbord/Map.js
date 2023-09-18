// import React from "react";
// import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

// const Map = ({ mostVisitedAreas }) => {
//   const center = { lat: 44.4, lng: 88.3 }; // Replace with the desired center coordinates

//   return (
//     <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
//       <GoogleMap mapContainerStyle={{ height: "400px", width: "100%" }} center={center} zoom={12}>
//         {/* Add marker for each place */}
//         {mostVisitedAreas.map((area, index) => (
//           <Marker key={index} position={{ lat: area.latitude, lng: area.longitude }} /> // Replace with the actual coordinates for each place
//         ))}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default Map;

import React, { useEffect } from "react";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import { renderToString } from "react-dom/server";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const Map = ({ mostVisitedAreas }) => {
  useEffect(() => {
    const map = L.map("map").setView([9.02497, 38.74689], 12);  // Set the map center to Addis Ababa


    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "Map data © OpenStreetMap contributors",
      language: "en", // Set the language to English
    }).addTo(map);

    // mostVisitedAreas.forEach((area) => {
    //   L.marker([area.latitude, area.longitude]).addTo(map);
    // });

    const iconSvgString = renderToString(
      <LocationOnOutlinedIcon/>
    );

    const customIcon = L.divIcon({
      html: `<div style="width: 24px; height: 24px;  background-color: red; border: 2, solid, red; border-radius: 50px;">${iconSvgString}</div>`,
      className: "custom-marker-icon",
      iconSize: [24, 24],
      iconAnchor: [12, 24]
    });
    mostVisitedAreas.forEach((area) => {
      const marker = L.marker([area.latitude, area.longitude], { icon:customIcon })
        .addTo(map)
        .bindPopup(
          `<b>${area.name}</b><br>${area.subtitle}<br><img src="${area.photo}" alt="${area.name}" style="width: 100px; height: auto;" />`
        );
        marker.on("click", () => {
          marker.openPopup();
        });
        marker.on("mouseover", () => {
          marker.openPopup();
        });
  
        // marker.on("mouseout", () => {
        //   marker.closePopup();
        // });
    });

    return () => {
      map.remove();
    };
  }, [mostVisitedAreas]);

  return <div id="map" style={{ height: "400px", width: "100%" }} />;
};

export default Map;