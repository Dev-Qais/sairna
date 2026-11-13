import { ArrowLeft, ExternalLink, LoaderCircle } from "lucide-react";
import { formatDuration } from "../utils/trackingHelpers";

function MapControls({ origin, destination, isLoading, error }) {
  const googleMapsUrl =
    origin?.coordinates && destination?.coordinates
      ? `https://www.google.com/maps/dir/?api=1&origin=${origin.coordinates[0]},${origin.coordinates[1]}&destination=${destination.coordinates[0]},${destination.coordinates[1]}&travelmode=driving`
      : null;

  return (
    <>
      {/* Route labels */}
      <div className="absolute right-3 top-3 z-[500] max-w-[75%] rounded-xl border border-white/70 bg-white/95 px-3 py-2 text-[10px] font-bold text-slate-700 shadow-lg backdrop-blur">
        <span className="text-[#0DAB9E]">من:</span> {origin?.name || "الانطلاق"}
        <ArrowLeft size={12} className="mx-1 inline" />
        <span className="text-[#E85B4A]">إلى:</span>{" "}
        {destination?.name || "الوصول"}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="absolute bottom-4 left-3 z-[500] flex items-center gap-2 rounded-xl bg-white/95 px-3 py-2.5 text-[10px] font-bold text-slate-700 shadow-lg">
          <LoaderCircle size={14} className="animate-spin text-[#0DAB9E]" />
          جاري تحميل مسار الطريق...
        </div>
      )}

      {/* Error */}
      {!isLoading && error && (
        <div className="absolute bottom-4 left-3 z-[500] max-w-[220px] rounded-xl bg-white/95 px-3 py-2.5 text-[10px] font-bold leading-5 text-slate-700 shadow-lg">
          {error}
        </div>
      )}

      {/* Google Maps */}
      {googleMapsUrl && (
        <div className="absolute bottom-4 right-3 z-[500]">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-[10px] font-black text-slate-800 shadow-lg transition hover:bg-slate-100"
          >
            <ExternalLink size={14} />
            فتح الاتجاهات
          </a>
        </div>
      )}
    </>
  );
}

export default MapControls;
