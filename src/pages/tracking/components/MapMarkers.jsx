import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const createMarkerIcon = (color) => {
  return L.divIcon({
    className: "sairna-map-marker",
    html: `
      <div style="
        width: 34px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        background: ${color};
        border: 3px solid white;
        box-shadow: 0 3px 12px rgba(0,0,0,.25);
      ">
        <div style="
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: white;
        "></div>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -32],
  });
};

const originIcon = createMarkerIcon("#0DAB9E");
const destinationIcon = createMarkerIcon("#E85B4A");

function MapMarkers({ origin, destination }) {
  return (
    <>
      {origin && (
        <Marker position={origin.coordinates} icon={originIcon}>
          <Popup>
            <strong>{origin.name}</strong>
            <br />
            نقطة انطلاق الرحلة
          </Popup>
        </Marker>
      )}

      {destination && (
        <Marker position={destination.coordinates} icon={destinationIcon}>
          <Popup>
            <strong>{destination.name}</strong>
            <br />
            وجهة الرحلة
          </Popup>
        </Marker>
      )}
    </>
  );
}

export default MapMarkers;
