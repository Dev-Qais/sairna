import { useEffect, useState } from "react";
import { getCoordinates } from "../utils/trackingHelpers";

const useTripRoute = (origin, destination) => {
  const [route, setRoute] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const originCoordinates = getCoordinates(origin);
    const destinationCoordinates = getCoordinates(destination);

    if (!originCoordinates || !destinationCoordinates) {
      setRoute(null);
      setRouteInfo(null);
      setIsLoading(false);
      setError("إحداثيات الانطلاق أو الوصول غير متوفرة.");
      return;
    }

    const controller = new AbortController();

    const fetchRoute = async () => {
      setIsLoading(true);
      setError(null);
      setRoute(null);
      setRouteInfo(null);

      try {
        const [originLat, originLng] = originCoordinates;
        const [destinationLat, destinationLng] = destinationCoordinates;

        const url =
          `https://router.project-osrm.org/route/v1/driving/` +
          `${originLng},${originLat};${destinationLng},${destinationLat}` +
          "?overview=full&geometries=geojson";

        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("تعذر الاتصال بخدمة مسارات الطرق.");
        }

        const data = await response.json();

        if (data.code !== "Ok" || !data.routes?.length) {
          throw new Error("لم يتم العثور على مسار لهذه الرحلة.");
        }

        const selectedRoute = data.routes[0];

        const coordinates = selectedRoute.geometry.coordinates.map(
          ([longitude, latitude]) => [latitude, longitude],
        );

        setRoute(coordinates);

        setRouteInfo({
          distance: selectedRoute.distance,
          duration: selectedRoute.duration,
        });
      } catch (err) {
        if (err.name === "AbortError") return;

        setError(err.message || "حدث خطأ أثناء تحميل مسار الرحلة.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchRoute();

    return () => controller.abort();
  }, [
    origin?.latitude,
    origin?.longitude,
    destination?.latitude,
    destination?.longitude,
  ]);

  return {
    route,
    routeInfo,
    isLoading,
    error,
  };
};

export default useTripRoute;
