import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2FsZ2FybyIsImEiOiJjbDVoNGZ4N3gwNXM4M2N1cmw2bms0MHd2In0.TStFb7zyAmR3vs1BFbThpQ';

const setUpMap = (center) => {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center,
    zoom: 7,
  });
  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav);
};

function successLocation(position) {
  console.log(position);
  setUpMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
  setUpMap([-2.24, 53.48]);
}

function Map() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy: true });
  }, []);
  return (
    <div id="map" className="map-box" />
  );
}

export default Map;
