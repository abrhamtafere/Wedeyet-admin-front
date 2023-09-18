import React from "react";
import Map from "./Map"; // Assuming you have a Map component
import PlaceCard from "./PlaceCard"; // Assuming you have a PlaceCard component

export const TopVisited = () => {
  const mostVisitedAreas = ["Area 1", "Area 2", "Area 3", "Area 4"]; // Replace with your actual data

  const topPlaces = [
    {
      id: 1,
      photo: "profile.avif", // Replace with the actual photo URL
      name: "Skylight Hotel",
      subtitle: "Subtitle 1",
      latitude: 9.0064,
      longitude: 38.7696,
    },
    {
      id: 2,
      photo: "download.png", // Replace with the actual photo URL
      name: "AASTU",
      subtitle: "Subtitle 2",
      latitude: 8.9589,
      longitude: 38.7888,
    },
    {
      id: 3,
      photo: "Capture.PNG", // Replace with the actual photo URL
      name: "Bole Medhanialem",
      subtitle: "Subtitle 3",
      latitude: 9.0092,
      longitude: 38.7614,
    },
    {
      id: 4,
      photo: "Capture.PNG", // Replace with the actual photo URL
      name: "Nuna Tech",
      subtitle: "Subtitle 4",
      latitude: 9.0272,
      longitude: 38.7597,
    },
  ];

  return (
    <div  className="bg-white rounded">
      <div className='flex px-4 pt-4  '>
      <h1 className=" text-xl font-semibold w-2/5">Top visited palces</h1>
      <div className="bg-gray-400 w-[100px] text-center font-semibold rounded items-center m-auto p-2">Daily</div>
      </div>
      <div className="flex bg-white rounded">
      <div className="w-3/4 p-4">
        <Map mostVisitedAreas={topPlaces} />
      </div>
      <div className="w-1/4 p-4">
        {topPlaces.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </div>
    </div>
    
  );
};