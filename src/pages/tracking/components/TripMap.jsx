import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";

import { useEffect, useMemo } from "react";

import MapMarkers from "./MapMarkers";
import MapControls from "./MapControls";
import useTripRoute from "../hooks/useTripRoute";
import { getCoordinates } from "../utils/trackingHelpers";

import "leaflet/dist/leaflet.css";

function FitMapBounds({ origin, destination, route }) {
  const map = useMap();

  useEffect(() => {
    // تحديث أبعاد الخريطة بعد اكتمال رسم الحاوية
    const frame = requestAnimationFrame(() => {
      map.invalidateSize();

      if (route?.length > 1) {
        map.fitBounds(route, { padding: [45, 45] });
      } else if (origin && destination) {
        map.fitBounds([origin, destination], {
          padding: [45, 45],
        });
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [map, origin, destination, route]);

  return null;
}

function TripMap({ trip }) {
  const originCoordinates = useMemo(
    () => getCoordinates(trip?.origin),
    [trip?.origin?.latitude, trip?.origin?.longitude],
  );

  const destinationCoordinates = useMemo(
    () => getCoordinates(trip?.destination),
    [trip?.destination?.latitude, trip?.destination?.longitude],
  );

  const origin = originCoordinates
    ? {
        name: trip?.origin?.name || "نقطة الانطلاق",
        coordinates: originCoordinates,
      }
    : null;

  const destination = destinationCoordinates
    ? {
        name: trip?.destination?.name || "وجهة الرحلة",
        coordinates: destinationCoordinates,
      }
    : null;

  const { route, routeInfo, isLoading, error } = useTripRoute(
    trip?.origin,
    trip?.destination,
  );

  const mapCenter = originCoordinates || [35.5, 38.5];

  return (
    <div
      dir="ltr"
      className="relative h-[420px] z-20 w-full overflow-hidden lg:h-[470px]"
    >
      <MapContainer
        origin={origin}
        destination={destination}
        isLoading={isLoading}
        error={
          !originCoordinates || !destinationCoordinates
            ? "إحداثيات الرحلة غير متوفرة."
            : error
        }
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {originCoordinates && destinationCoordinates && (
          <FitMapBounds
            origin={originCoordinates}
            destination={destinationCoordinates}
            route={route}
          />
        )}

        <MapMarkers origin={origin} destination={destination} />

        {route?.length > 1 && (
          <Polyline
            positions={route}
            pathOptions={{
              color: "#0DAB9E",
              weight: 5,
              opacity: 0.85,
              lineCap: "round",
              lineJoin: "round",
            }}
          />
        )}
      </MapContainer>

      <MapControls
        origin={origin}
        destination={destination}
        isLoading={isLoading}
        error={
          !originCoordinates || !destinationCoordinates
            ? "إحداثيات الرحلة غير متوفرة."
            : error
        }
      />
    </div>
  );
}

export default TripMap;
