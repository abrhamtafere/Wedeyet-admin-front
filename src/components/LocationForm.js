import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import 'tailwindcss/tailwind.css';

export const LocationForm = () => {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(null);

  const handleSelect = async (selectedAddress) => {
    setAddress(selectedAddress);
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      setCoordinates([latLng.lat, latLng.lng]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-80">
        <h1 className="text-3xl font-bold mb-4">Location Form</h1>
        <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Enter location',
                  className: 'w-full p-2 border border-gray-300 rounded'
                })}
              />
              <div className="mt-2">
                {loading ? <div>Loading...</div> : null}
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? '#fafafa' : '#ffffff'
                  };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        style,
                        className: 'p-2 cursor-pointer'
                      })}
                    >
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        {coordinates && (
          <div className="mt-4">
            <h2 className="font-bold">Selected Location:</h2>
            <p>{coordinates[0]}, {coordinates[1]}</p>
          </div>
        )}
      </div>
    </div>
  );
};