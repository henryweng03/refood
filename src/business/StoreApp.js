import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
// import { connect } from "react-redux";
import firebase from "../firebase";

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
};

const StoreApp = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markers, setMarkers] = React.useState([]);
  const [selectedMarker, setSelectedMarker] = React.useState(null);
  // const [eventData, setEventData] = React.useState([]);

  useEffect(() => {
    console.log("activated");
    console.log("markers 1", markers);
    const ref = firebase.database().ref("/EventInfo");
    let eventInfo = [];
    ref.on("value", (response) => {
      const data = response.val();
      for (let id in data) {
        eventInfo.push({
          data: data[id].data,
          time: data[id].time,
        });
      }
      console.log("eventInfo", eventInfo);
      for (let i in eventInfo) {
        console.log("copying", eventInfo[i]);
        setMarkers(eventInfo);
      }
      // for (let i in markers) {
      //   console.log(i);
      // }
      console.log("markers 2", markers);
    });
  }, []);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const firestore = firebase.database().ref("/EventInfo");
    firestore.push({ data, time: new Date().toString() });
    console.log("data", data);
    console.log("marker", markers);
    setMarkers((current) => [
      ...current,
      { data, time: new Date().toString() },
    ]);
    document.getElementById("add-marker-form").reset();
  };

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div>
      <h1>Refood Store Interface</h1>
      <br />
      <div className="map">
        <h2 className="map-header">Food Event Map</h2>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={center}
          options={options}
          onLoad={onMapLoad}
        >
          {/* renders markers on the map */}
          {markers.map((marker) => (
            <Marker
              key={marker.time}
              position={{
                lat: parseFloat(marker.data.lat),
                lng: parseFloat(marker.data.lng),
              }}
              icon={{
                url: "../refood_icon.png",
                scaledSize: new window.google.maps.Size(45, 45),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(22.5, 22.5),
              }}
              onClick={() => {
                setSelectedMarker(marker);
              }}
            />
          ))}

          {selectedMarker ? (
            <InfoWindow
              position={{
                lat: parseFloat(selectedMarker.data.lat),
                lng: parseFloat(selectedMarker.data.lng),
              }}
              onCloseClick={() => {
                setSelectedMarker(null);
              }}
            >
              <div>
                <h2>{selectedMarker.data.name}</h2>
                <p>{selectedMarker.data.description}</p>
                <p>Event start: {selectedMarker.data.startDate}</p>
                <p>Event end: {selectedMarker.data.endDate}</p>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
      <br />
      <br />
      <div className="create-event">
        <h2 className="form-header">Create New Event</h2>
        <form onSubmit={handleSubmit(onSubmit)} id="add-marker-form">
          <div className="field">
            <input type="number" step="any" required {...register("lat")} />
            <br />
            <br />
            <label>Latitude</label>
          </div>
          <div className="field">
            <input type="number" step="any" required {...register("lng")} />
            <br />
            <br />
            <label>Longitude</label>
          </div>
          <div className="field">
            <input type="text" required {...register("name")} />
            <br />
            <br />
            <label>Event name</label>
          </div>
          <div className="field">
            <input type="datetime-local" required {...register("startDate")} />
            <br />
            <br />
            <label>Event start</label>
          </div>
          <div className="field">
            <input type="datetime-local" required {...register("endDate")} />
            <br />
            <br />
            <label>Event end</label>
          </div>
          <div className="field">
            <input type="text" required {...register("description")} />
            <br />
            <label>Event description</label>
          </div>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default StoreApp;

// const mapStateToProps = (state) => {
//   return {
//     events: state.event.events,
//   };
// };

// export default connect()(mapStateToProps)(StoreApp);
