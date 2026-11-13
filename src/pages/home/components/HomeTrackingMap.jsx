import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";

const previewIcon = L.divIcon({
  className: "home-tracking-marker",
  html: `
    <div style="
      width: 24px;
      height: 24px;
      background: var(--primary, #0aa99b);
      border: 4px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 12px rgba(0,0,0,.2);
    "></div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

function MapResize() {
  const map = useMap();

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      map.invalidateSize();
    });

    return () => cancelAnimationFrame(timer);
  }, [map]);

  return null;
}

function HomeTrackingMap() {
  const position = [34.8, 37.2];

  return (
    <div
      dir="rtl"
      className="flex h-full min-h-[360px] flex-col bg-[#f0f7f4] p-5 sm:p-7 lg:p-8"
    >
      <div className="mb-4 flex items-center justify-between gap-3 text-xs font-bold text-[#17485a]">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]" />
          معاينة مسار الرحلة
        </span>

        <span>حلب - دمشق</span>
      </div>

      <div className="relative z-10 min-h-[250px] flex-1 overflow-hidden rounded-2xl">
        <MapContainer
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          dragging={true}
          zoomControl={true}
          className="h-full min-h-[250px] w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={position} icon={previewIcon} />

          <MapResize />
        </MapContainer>
      </div>

      <div className="mt-4 flex items-center gap-3 text-xs font-bold text-[#17485a]">
        <span>دمشق</span>

        <div className="relative h-[2px] flex-1 bg-[#9bd8c9]">
          <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary)]" />
        </div>

        <span>حلب</span>
      </div>
    </div>
  );
}

export default HomeTrackingMap;
