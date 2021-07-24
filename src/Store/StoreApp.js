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
  width: "100%",
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
  const [selectedMarker, setSelectedMarker] = React.useState(null);

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

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, [])

  if(loadError) return "Error loading maps";
  if(!isLoaded) return "Loading maps";

  return <div>
    <h1>Refood</h1>
    <div class = "map">
      <h2 class = "map-header">Event Map</h2>
      <GoogleMap 
        mapContainerStyle = {mapContainerStyle}
        zoom = {12}
        center = {center}
        options = {options}
        onLoad = {onMapLoad}
      >
        {/* renders markers on the map */}
        {markers.map((marker) => (
          <Marker
            key = {marker.time.toISOString()}
            position = {{lat: parseFloat(marker.data.lat), lng: parseFloat(marker.data.lng)}}
            icon = {{
              url: '../event.png',
              scaledSize: new window.google.maps.Size(45,45),
              origin: new window.google.maps.Point(0,0),
              anchor: new window.google.maps.Point(22.5,22.5)
            }}
            onClick = {() => {
              setSelectedMarker(marker);
            }}
          />
        ))}

        {selectedMarker ? (
            <InfoWindow
              position={{ lat: parseFloat(selectedMarker.data.lat), lng: parseFloat(selectedMarker.data.lng) }}
              onCloseClick={() => {
                setSelectedMarker(null);
              }}
            >
              <div>
                <h2>
                  {selectedMarker.data.name} 🥬
                </h2>
                <p>
                  {selectedMarker.data.description}
                </p>
                <p>
                  Event start: {selectedMarker.data.startDate}
                </p>
                <p>
                  Event end: {selectedMarker.data.endDate}
                </p>
              </div>
            </InfoWindow>
          ) : null}

      </GoogleMap>
    </div>
    <p></p>
    <div class = "create-event">
      <h2 class = "form-header">Create New Event</h2>
      <form onSubmit = {handleSubmit(onSubmit)} id = "add-marker-form">
        <div class = "field">
         <input type = "number" step = "any" required {...register("lat")} /><br/><br/>
         <label>Latitude</label>
        </div>
        <div class = "field">
         <input type = "number" step = "any" required {...register("lng")} /><br/><br/>
         <label>Longitude</label>
        </div>
        <div class = "field">
         <input type = "text" required {...register("name")} /><br/><br/>
         <label>Event name</label>
        </div>
        <div class = "field">
         <input type = "datetime-local" required {...register("startDate")} /><br/><br/>
         <label>Event start</label>
        </div>
        <div class = "field">
         <input type = "datetime-local" required {...register("endDate")} /><br/><br/>
         <label>Event end</label>
        </div>
        <div class = "field">
          <input type = "text" required {...register("description")} /><br/><br/>
         <label>Event description</label>
        </div>
        <input type = "submit" />
    </form>
    </div>
  </div>
}
