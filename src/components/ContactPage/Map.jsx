
import Map, { Marker } from 'react-map-gl';
import { useMediaQuery } from '@mui/material';
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import mapboxgl from 'mapbox-gl';

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

function MapComp() {
  const isLg = useMediaQuery('(max-width:1200px)');

  return (
    <Map
      initialViewState={{
        longitude: 18.1999992,
        latitude: 48.2666656,
        zoom: 11,
      }}
      style={{ width: `${isLg ? '100%' : '400px'}`, height: 350, marginLeft: '2.5rem', marginRight: '1rem', borderRadius: '8px', margin: `${isLg && '2.5rem 0'}`, filter: `${isLg && 'drop-shadow(2px 3px 15px rgba(90, 90, 90, 0.24))'}` }}
      mapStyle="mapbox://styles/kalgaro/clctiyuy200b414qh4wj95le5"

    >
      <Marker longitude={18.1907992} latitude={48.2699656} color="#e6b45e" />
    </Map>
  );
}

export default MapComp;
