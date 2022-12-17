
import Map from 'react-map-gl';
import { useMediaQuery } from '@mui/material';

function MapComp() {
  const isLg = useMediaQuery('(max-width:1200px)');

  return (
    <Map
      initialViewState={{
        longitude: 18.0420608,
        latitude: 48.3131392,
        zoom: 11,
      }}
      style={{ width: `${isLg ? '100%' : '400px'}`, height: 350, marginLeft: '2.5rem', marginRight: '1rem', borderRadius: '8px', margin: `${isLg && '2.5rem 0'}`, filter: `${isLg && 'drop-shadow(2px 3px 15px rgba(90, 90, 90, 0.24))'}` }}
      mapStyle="mapbox://styles/kalgaro/cla9p51yw000y15m2uyzcnv35"
    />
  );
}

export default MapComp;
