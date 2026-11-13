import { ArrowLeft, Armchair, Bus, CalendarDays, Clock } from "lucide-react";

function TripCard({ trip, onSelectTrip }) {
  if (!trip) return null;

  const isDeparted = new Date(trip.departureAt).getTime() <= Date.now();

  const formatTime = (date) => {
    if (!date) return "--:--";

    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Damascus",
    }).format(new Date(date));
  };

  const formatDuration = (departureAt, arrivalAt) => {
    if (!departureAt || !arrivalAt) return "";

    const duration = new Date(arrivalAt) - new Date(departureAt);

    const totalMinutes = Math.floor(duration / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours} س ${minutes} د`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US").format(price);
  };

  const companyName = trip.company?.name || "شركة النقل";
  const companyLogo = trip.company?.logoUrl;

  return (
    <article
      className={`
        mb-4
        rounded-2xl
        border border-[var(--border)]
        bg-[var(--surface)]
        shadow-md
        transition-all duration-300 ease-in-out
        hover:-translate-y-1
        hover:shadow-sm
        hover:border-[var(--primary)]
        ${isDeparted ? "opacity-65" : ""}
      `}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] p-4 sm:px-5">
        <div className="flex items-center gap-3">
          {companyLogo ? (
            <img
              src={companyLogo}
              alt={companyName}
              className="h-11 w-11 rounded-xl border border-[var(--border)] object-contain"
            />
          ) : (
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--soft-teal)] text-lg font-black text-[var(--primary-deep)]">
              {companyName.charAt(2)}
            </span>
          )}

          <div>
            <strong className="block text-sm font-black text-[var(--text)] sm:text-base">
              {companyName.slice(0, -8)}
            </strong>
          </div>
        </div>

        <span className="inline-flex items-center gap-2 rounded-lg bg-[var(--soft-teal)] px-3 py-2 text-xs font-bold text-[var(--primary-deep)]">
          <Bus size={16} />
          رحلة بالحافلة
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-6 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Timing */}
        <div className="flex flex-1 items-center justify-between gap-2 sm:gap-4">
          {/* Departure */}
          <div className="min-w-0 text-center">
            <b className="block text-xl font-black text-[var(--text)] sm:text-2xl">
              {formatTime(trip.departureAt)}
            </b>

            <span className="mt-2 block truncate text-sm font-bold text-[var(--text)]">
              {trip.origin?.name || "مدينة الانطلاق"}
            </span>
          </div>

          {/* Route */}
          <div className="flex min-w-[90px] flex-1 flex-col items-center gap-2">
            <span className="text-xs font-semibold text-[var(--muted)]">
              {formatDuration(trip.departureAt, trip.arrivalAt)}
            </span>

            <div className="flex w-full items-center gap-2 text-[var(--primary)]">
              <span className="h-2 w-2 shrink-0 rounded-full border-2 border-current" />

              <span className="h-px flex-1 border-t border-dashed border-[var(--border)]" />

              <Bus size={19} className="shrink-0" />

              <span className="h-px flex-1 border-t border-dashed border-[var(--border)]" />

              <span className="h-2 w-2 shrink-0 rounded-full bg-current" />
            </div>

            <small className="text-xs text-[var(--muted)]">مباشرة</small>
          </div>

          {/* Arrival */}
          <div className="min-w-0 text-center">
            <b className="block text-xl font-black text-[var(--text)] sm:text-2xl">
              {formatTime(trip.arrivalAt)}
            </b>

            <span className="mt-2 block truncate text-sm font-bold text-[var(--text)]">
              {trip.destination?.name || "مدينة الوصول"}
            </span>
          </div>
        </div>

        {/* Booking */}
        <div className="flex flex-col gap-2 border-t border-[var(--border)] pt-4 lg:min-w-[190px] lg:border-r lg:border-t-0 lg:pr-5 lg:pt-0">
          <small className="text-xs text-[var(--muted)]">السعر للشخص</small>

          <b className="text-xl font-black text-[var(--primary-deep)]">
            {formatPrice(trip.price)} ل.س
          </b>

          <span className="flex items-center gap-2 text-xs font-semibold text-[var(--muted)]">
            <Armchair size={16} />
            {trip.availableSeats} مقعد متاح
          </span>

          {isDeparted ? (
            <span className="flex items-center justify-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm font-black text-red-600">
              <Clock size={16} />
              انتهى موعد الانطلاق
            </span>
          ) : (
            <button
              type="button"
              className="
                flex items-center justify-center gap-2
                rounded-xl
                bg-[var(--primary)]
                px-3 py-2
                text-sm font-black
                text-white
                transition-all duration-300 ease-out
                hover:opacity-90
                hover:scale-[1.02]
                active:scale-[0.98]
              "
              data-action="selecttrip"
              data-id={trip.id}
              onClick={() => onSelectTrip(trip)}
            >
              اختيار المقاعد
              <ArrowLeft size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center gap-2 border-t border-[var(--border)] bg-[var(--surface)] px-4 py-3 sm:px-5">
        <span className="inline-flex items-center gap-2 text-xs text-[var(--muted)]">
          <CalendarDays size={15} />
          رقم الرحلة: {trip.code}
        </span>
      </div>
    </article>
  );
}

export default TripCard;
