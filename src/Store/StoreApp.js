import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "500px",
  height: "400px",
};
const center = {
  lat: 37.33,
  lng: -121.893,
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
}
export default function StoreApp() {
  const {isLoaded, loadError} = useLoadScript({
   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
   libraries,
  });

  if (loadError) return "Error loading maps";
  if(!isLoaded) return "Loading maps";

  return <div>
    <h1>Refood </h1>
    <GoogleMap 
      mapContainerStyle = {mapContainerStyle}
      zoom = {10}
      center = {center}
      options = {options}>
    </GoogleMap>
  </div>
}
