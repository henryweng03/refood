import React from "react";
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
  height: "600px",
};
const center = {
  lat: 37.33,
  lng: -121.893,
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
}

export default function Individual() {
  const {isLoaded, loadError} = useLoadScript({
   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
   libraries,
  });

  const [markers, setMarkers] = React.useState([]);
  const [selectedMarker, setSelectedMarker] = React.useState(null);

  const { register, handleSubmit } = useForm();
  const onButtonClick = () => {
    setMarkers((current) => [
      ...current,
      {
        lat: 37.4,
        lng: -121.9,
        time: new Date(),
      }
    ])
  }

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, [])

  if(loadError) return "Error loading maps";
  if(!isLoaded) return "Loading maps";

  return <div>
    <h1>Refood Individual Interface</h1><br />
    <div class = "map">
      <h2 class = "map-header">Food Event Map</h2>
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
            position = {{lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)}}
            icon = {{
              url: '../refood_icon.png',
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
              position={{ lat: parseFloat(selectedMarker.lat), lng: parseFloat(selectedMarker.lng) }}
              onCloseClick={() => {
                setSelectedMarker(null);
              }}
            >
              <div>
                <h2>
                  Test Title
                </h2>
                <p>
                  Test Description
                </p>
                <button className = 'signup-button' onClick = {onButtonClick} >Sign Up</button>
              </div>
            </InfoWindow>
          ) : null}

      </GoogleMap>
    </div>
    <button className = 'landing-button' onClick = {onButtonClick} >Add Marker</button>
    <br /><br />
  </div>
}
