import React from "react";
import { useForm } from "react-hook-form";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Dialog from "@material-ui/core/Dialog";
import firebase from "../firebase"


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
  const [open, setOpen] = React.useState(false);
  
  const signUpRef = firebase.firestore().collection("/signups");

  function addSignUp(newSignUp){
    signUpRef
    .doc()
    .set(newSignUp)
    .catch((err) => {
      console.error(err);
    })
  }

  const handleSignUpOpen = () =>{
      setOpen(true);
  }

  const handleSignUpClose = () =>{
    setOpen(false);
}

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
        onClick = {()=>setSelectedMarker(null)}
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
                <button className = 'signup-button' onClick = {handleSignUpOpen} >Sign Up</button>
                <Dialog
                  open = {open}
                  onClose = {handleSignUpClose}
                  PaperProps={{
                    style: { borderRadius: 20, width: "55vh"}
                  }}>
                      <div class = "sign-form">
                        <h2>Event Sign Up</h2>
                        <br />
                        <form id = "signup-form" onSubmit = {handleSubmit((data) =>{
                          addSignUp(data);
                          document.getElementById("signup-form").reset();
                        })}>
                          <div class = "field">
                            <input type = "text" required {...register("fname")} /><br/><br/>
                            <label>First Name</label>
                          </div>
                          <div class = "field">
                            <input type = "text" required {...register("lname")} /><br/><br/>
                            <label>Last Name</label>
                          </div>
                          <div class = "field">
                            <input type = "email" required {...register("email")} /><br/><br/>
                            <label>Email</label>
                          </div>
                            <input type = "submit" />
                        </form>
                      </div>
                </Dialog>
              </div>
            </InfoWindow>
          ) : null}

      </GoogleMap>
    </div>
    <button className = 'landing-button' onClick = {onButtonClick} >Add Marker</button>
    <br /><br />
  </div>
}
