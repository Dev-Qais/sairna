import {
  BusFront,
  Clock3,
  Route,
  Users,
  Wallet,
  RefreshCw,
  Info,
  CheckCircle2,
  Circle,
  MapPin,
  Flag,
} from "lucide-react";

import {
  formatPrice,
  formatTime,
  getTripDuration,
} from "../utils/trackingHelpers";

function TripSidebar({ booking }) {
  if (!booking?.trip) return null;

  const trip = booking.trip;
  const seats = booking.seats || [];

  const duration = getTripDuration(trip.departureAt, trip.arrivalAt);

  const origin = trip.origin?.name || "غير محدد";
  const destination = trip.destination?.name || "غير محدد";
  const company = trip.company?.name.slice(0, -8) || "شركة النقل";

  const departureDate = formatTime(trip.departureAt);
  const arrivalDate = formatTime(trip.arrivalAt);

  return (
    <aside
      dir="rtl"
      className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-[var(--text)] shadow-[var(--shadow)]"
    >
      {/* Booking status and code */}
      <div className="mb-5 flex items-center justify-between gap-2">
        <span className="text-[10px] font-bold text-[var(--muted)]">
          {booking.code || `#${booking.id}`}
        </span>

        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
          <span className="text-[10px] font-bold text-[var(--primary)]">
            {booking.status === "CONFIRMED" ? "الحجز مؤكد" : "تفاصيل الحجز"}
          </span>
        </div>
      </div>

      {/* Origin and destination */}
      <div className="mb-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="min-w-0">
          <span className="mb-1 block text-[10px] text-[var(--muted)]">من</span>

          <h2 className="truncate text-xl font-black">{origin}</h2>
        </div>

        <Route size={19} className="text-[var(--primary)]" />

        <div className="min-w-0 text-left">
          <span className="mb-1 block text-[10px] text-[var(--muted)]">
            إلى
          </span>

          <h2 className="truncate text-xl font-black">{destination}</h2>
        </div>
      </div>

      {/* Transport company */}
      <div className="mb-5 flex items-center gap-3">
        {trip.company?.logoUrl ? (
          <img
            src={trip.company.logoUrl}
            alt={company}
            className="h-10 w-10 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] object-contain p-1"
          />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--soft-teal)] text-[var(--primary)]">
            <BusFront size={21} />
          </div>
        )}

        <div className="min-w-0">
          <h3 className="text-xs font-black">{company}</h3>

          <p className="mt-0.5 text-[9px] text-[var(--muted)]">
            موعد الانطلاق {departureDate}
          </p>
        </div>
      </div>

      <div className="mb-4 h-px bg-[var(--border)]" />

      {/* Trip timeline */}
      <div className="mb-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xs font-black">مسار الرحلة</h3>

          <span className="text-[10px] font-bold text-[var(--muted)]">
            {duration || "المدة غير محددة"}
          </span>
        </div>

        {/* Departure */}
        <div className="relative flex gap-3">
          <div className="relative flex w-5 shrink-0 justify-center">
            <span className="absolute top-5 h-[calc(100%+22px)] border-r border-dashed border-[var(--border)]" />

            <span className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--soft-teal)] text-[var(--primary)]">
              <CheckCircle2 size={13} />
            </span>
          </div>

          <div className="flex min-w-0 flex-1 items-start justify-between gap-2 pb-6">
            <div>
              <h4 className="text-[11px] font-bold">{origin}</h4>

              <p className="mt-0.5 text-[9px] text-[var(--muted)]">
                نقطة الانطلاق
              </p>
            </div>

            <span className="shrink-0 text-[9px] font-bold text-[var(--muted)]">
              {departureDate}
            </span>
          </div>
        </div>

        {/* Destination */}
        <div className="relative flex gap-3">
          <div className="flex w-5 shrink-0 justify-center">
            <span className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--surface-alt)] text-[var(--muted)]">
              <Flag size={12} />
            </span>
          </div>

          <div className="flex min-w-0 flex-1 items-start justify-between gap-2">
            <div>
              <h4 className="text-[11px] font-bold">{destination}</h4>

              <p className="mt-0.5 text-[9px] text-[var(--muted)]">
                نقطة الوصول
              </p>
            </div>

            <span className="shrink-0 text-[9px] font-bold text-[var(--muted)]">
              {arrivalDate}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-4 h-px bg-[var(--border)]" />

      {/* Seats */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xs font-black">تفاصيل المقاعد</h3>

          <span className="flex items-center gap-1 text-[10px] text-[var(--muted)]">
            <Users size={13} />
            {seats.length} مسافر
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {seats.map((seat) => (
            <span
              key={seat.id}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface-alt)] px-3 py-1.5 text-[10px] font-bold"
            >
              مقعد {seat.seatNumber}
            </span>
          ))}
        </div>
      </div>

      {/* Trip information */}
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] p-3">
          <div className="mb-1 flex items-center gap-1.5 text-[9px] text-[var(--muted)]">
            <Wallet size={12} />
            إجمالي الحجز
          </div>

          <p className="text-sm font-black text-[var(--primary)]">
            {formatPrice(booking.totalPrice)}
          </p>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] p-3">
          <div className="mb-1 flex items-center gap-1.5 text-[9px] text-[var(--muted)]">
            <Clock3 size={12} />
            مدة الرحلة
          </div>

          <p className="text-sm font-black">{duration || "غير محددة"}</p>
        </div>
      </div>

      {/* Information note */}
      <div className="mt-4 flex gap-2 rounded-lg bg-[var(--surface-alt)] p-2.5">
        <Info size={13} className="mt-0.5 shrink-0 text-[var(--primary)]" />

        <p className="text-[9px] leading-5 text-[var(--muted)]">
          يعرض هذا القسم بيانات الحجز ومسار الطريق بين المدينتين. لا يتوفر
          حالياً تتبع مباشر لموقع الحافلة.
        </p>
      </div>
    </aside>
  );
}

export default TripSidebar;
