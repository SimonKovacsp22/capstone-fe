
import Map from 'react-map-gl';

function MapComp() {
  return (
    <Map
      initialViewState={{
        longitude: 18.0420608,
        latitude: 48.3131392,
        zoom: 11,
      }}
      style={{ width: 400, height: 350, marginLeft: '2rem' }}
      mapStyle="mapbox://styles/kalgaro/cla9p51yw000y15m2uyzcnv35"
    />
  );
}

export default MapComp;
