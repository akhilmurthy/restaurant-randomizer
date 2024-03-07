import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapComponent = ({ latitude, longitude, setLatitude, setLongitude }) => {
  const [mapCenter, setMapCenter] = useState({
    lat: latitude || 0,
    lng: longitude || 0,
  });

  useEffect(() => {
    if (!latitude || !longitude) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: currentLat, longitude: currentLng } =
            position.coords;
          setMapCenter({ lat: currentLat, lng: currentLng });
          setLatitude(currentLat);
          setLongitude(currentLng);
        },
        (error) => {
          console.error("Error getting current location:", error);
          setMapCenter({ lat: 0, lng: 0 });
          setLatitude(0);
          setLongitude(0);
        }
      );
    } else {
      setMapCenter({ lat: latitude, lng: longitude });
    }
  }, [latitude, longitude, setLatitude, setLongitude]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyBuJ_gjQ9b2_2FyokxAk7B1kvm3MApR7mg">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={mapCenter}
        zoom={15}
      >
        {latitude && longitude && (
          <Marker position={{ lat: latitude, lng: longitude }} />
        )}
        {/* Additional map features (markers, etc.) can be added here */}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
