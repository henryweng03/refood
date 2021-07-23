import React from "react";
import './store.css';
import { useForm } from "react-hook-form";
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

  const [markers, setMarkers] = React.useState([]);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    setMarkers((current) => [
      ...current,
      {
        data,
        time: new Date(),
      }
    ])
    document.getElementById("add-marker-form").reset();
  }

  if (loadError) return "Error loading maps";
  if(!isLoaded) return "Loading maps";

  return <div>
    <h1>Refood🥬</h1>
    <GoogleMap 
      mapContainerStyle = {mapContainerStyle}
      zoom = {10}
      center = {center}
      options = {options}
    >
      {/* renders markers on the map */}
      {markers.map((marker) => (
        <Marker
          key = {marker.time.toISOString()}
          position = {{lat: parseFloat(marker.data.lat), lng: parseFloat(marker.data.lng)}}
          />
      ))}
    </GoogleMap>
    <p></p>
    <form onSubmit = {handleSubmit(onSubmit)} id = "add-marker-form">
      <label htmlFor = "lat">Latitude:</label>
      <input type = "number" step = "any" {...register("lat")} /><br/>
      <label htmlFor = "lng">Longitude:</label>
      <input type = "number" step = "any" {...register("lng")} /><p/>
      <input type = "submit" />
    </form>
  </div>
}
