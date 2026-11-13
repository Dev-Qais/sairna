import { Clock, Flag } from "lucide-react";
import { formatTime, formatDate } from "../utils/trackingHelpers";

function TripTimeline({ trip }) {
  if (!trip) return null;

  return (
    <div className="relative space-y-6">
      {/* Departure */}
      <div className="relative flex gap-4">
        <div className="relative flex w-5 shrink-0 justify-center">
          <span className="absolute top-5 h-[calc(100%+24px)] w-px border-r-2 border-dashed border-slate-200" />
          <span className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[#0DAB9E]/10">
            <span className="h-2.5 w-2.5 rounded-full bg-[#0DAB9E]" />
          </span>
        </div>

        <div className="min-w-0 flex-1 pb-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-400">
              نقطة الانطلاق
            </span>
            <span className="flex items-center gap-1 text-xs font-black text-slate-700">
              <Clock size={13} />
              {formatTime(trip.departureAt)}
            </span>
          </div>

          <h3 className="mt-2 text-base font-black text-slate-800">
            {trip.origin?.name || "غير محدد"}
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            {formatDate(trip.departureAt)}
          </p>
        </div>
      </div>

      {/* Destination */}
      <div className="flex gap-4">
        <div className="flex w-5 shrink-0 justify-center">
          <span className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[#E85B4A]/10">
            <Flag size={12} className="text-[#E85B4A]" />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-400">
              نقطة الوصول
            </span>
            <span className="flex items-center gap-1 text-xs font-black text-slate-700">
              <Clock size={13} />
              {formatTime(trip.arrivalAt)}
            </span>
          </div>

          <h3 className="mt-2 text-base font-black text-slate-800">
            {trip.destination?.name || "غير محدد"}
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            {formatDate(trip.arrivalAt)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TripTimeline;
