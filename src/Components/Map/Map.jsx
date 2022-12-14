import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  LoadScript,
  Autocomplete,
  InfoWindow,
} from "@react-google-maps/api";
import MapStyle from "./MapStyle";
import { useEffect } from "react";
import InfoCard from "../InfoCard/InfoCard";
import InfoCardSearch from "../InfoCardSearch/InfoCardSearch";

export default function Map(props) {
  let listings = props.listings;

  //Search Related Marker setup
  const searchAddress = props.searchAddress;
  const searchlat = parseFloat(props.lat);
  const searchlng = parseFloat(props.lng);
  const searchMarker = {
    searchAddress: searchAddress,
    lat: searchlat,
    lng: searchlng,
  };
  const searchImage = require("../../assets/location_star.png");

  //Centering lat long
  const [centerLat, setCenterLat] = useState(searchlat);
  const [centerLng, setCenterLng] = useState(searchlng);

  //Listing markers setup
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null); // parking markers
  const [selected2, setSelected2] = React.useState(null); //for search markers
  const image = require("../../assets/iconparking2.png");

  let mark = [];
  let index = 0;

  listings.map((l) => {
    mark.push({
      id: l._id,
      lat: parseFloat(l.lat),
      lng: parseFloat(l.lng),
      address: l.address,
      rate: l.rate,
      photo: l.photo,
    });
    index = index + 1;
  });

  useEffect(() => {
    console.log("At this time listings looks like ", listings);
    setMarkers(mark);
  }, []);

  return (
    <GoogleMap
      zoom={props.zoom}
      center={{ lat: centerLat, lng: centerLng }}
      options={{ styles: MapStyle }}
      mapContainerStyle={{ width: props.mapWidth, height: props.mapHeight }}
    >
      {markers.map((marker, idx) => (
        <Marker
          key={marker.lat + idx}
          position={{ lat: marker.lat, lng: marker.lng }}
          icon={{
            url: image,
            scaledSize: new window.google.maps.Size(54.5, 75),
          }}
          onClick={() => {
            setCenterLat(marker.lat);
            setCenterLng(marker.lng);
            setSelected(marker);
          }}
        />
      ))}
      {selected ? (
        <InfoWindow
          position={selected}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div>
            <InfoCard
              id={selected.id}
              address={selected.address}
              rate={selected.rate}
              photo={selected.photo}
            />
          </div>
        </InfoWindow>
      ) : null}
      {/* this is for search star below*/}
      <Marker
        key={searchlat + searchlng}
        position={{ lat: searchlat, lng: searchlng }}
        icon={{
          url: searchImage,
          scaledSize: new window.google.maps.Size(66.5, 75),
        }}
        onClick={() => {
          setSelected2(searchMarker);
        }}
      />
      {selected2 ? (
        <InfoWindow
          position={selected2}
          onCloseClick={() => {
            setSelected2(null);
          }}
        >
          <div>
            <InfoCardSearch searchAddress={selected2.searchAddress} />
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  );
}
