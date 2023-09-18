import React from "react";

const PlaceCard = ({ place }) => {
  const { photo, name, subtitle } = place;

  return (
    <div className="flex mb-4">
      <img src={photo} alt={name} className="w-16 h-12 mr-4" />
      <div>
        <h3 className="text-lg font-medium">{name}</h3>
        <p className="text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
};

export default PlaceCard;