import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

const MapComponent = ({ google, setLatitude, setLongitude }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMapCenter({ lat: latitude, lng: longitude });
        setKey((prevKey) => prevKey + 1); // Update key to force re-render
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (error) => {
        console.error("Error getting current location:", error);
      }
    );
  }, []);

  return (
    <Map
      key={key} // Add key prop to force re-render
      google={google}
      zoom={15}
      initialCenter={mapCenter}
      style={{ width: "80%", height: "50%" }}
    />
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBuJ_gjQ9b2_2FyokxAk7B1kvm3MApR7mg", // Replace with your Google Maps API key
})(MapComponent);
