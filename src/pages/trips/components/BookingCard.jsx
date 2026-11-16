import {
  Bus,
  Ticket,
  CalendarDays,
  Armchair,
  Users,
  Hash,
  Route,
} from "lucide-react";

import BookingStatus from "./BookingStatus";
import {
  formatDate,
  formatTime,
  formatPrice,
} from "../utils/bookingFormatters";

function BookingCard({ booking, onShowTicket, onTrack }) {
  const trip = booking.trip;
  const seats = booking.seats || [];

  return (
    <article className="overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Card header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] p-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-[var(--soft-teal)] text-[var(--primary)]">
            {trip.company?.logoUrl ? (
              <img
                src={trip.company.logoUrl}
                alt={trip.company.name}
                className="h-full w-full object-contain"
              />
            ) : (
              <Bus size={22} />
            )}
          </div>

          <div>
            <h3 className="text-xs font-black text-[var(--text)] sm:text-sm">
              {trip.company?.name?.slice(0, -8) || "شركة النقل"}
            </h3>

            <p className="mt-1 text-[10px] text-[var(--muted)]">
              رحلة رقم {trip.code}
            </p>
          </div>
        </div>

        <BookingStatus status={booking.status} />
      </div>

      {/* Route */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 p-4 sm:px-6 sm:py-5">
        <div>
          <span className="text-[10px] font-bold text-[var(--muted)]">
            الانطلاق
          </span>

          <h4 className="mt-1 text-lg font-black text-[var(--text)] sm:text-xl">
            {trip.origin?.name || "غير محدد"}
          </h4>

          <span className="mt-1 block text-sm font-black text-[var(--primary)]">
            {formatTime(trip.departureAt)}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-[9px] font-bold text-[var(--muted)]">رحلة</span>

          <div className="flex w-16 items-center">
            <span className="h-px flex-1 bg-[var(--border)]" />
            <Bus size={19} className="mx-1 text-[var(--primary)]" />
            <span className="h-px flex-1 bg-[var(--border)]" />
          </div>

          <span className="text-[9px] font-bold text-[var(--muted)]">
            مباشرة
          </span>
        </div>

        <div className="text-left">
          <span className="text-[10px] font-bold text-[var(--muted)]">
            الوصول
          </span>

          <h4 className="mt-1 text-lg font-black text-[var(--text)] sm:text-xl">
            {trip.destination?.name || "غير محدد"}
          </h4>

          <span className="mt-1 block text-sm font-black text-[var(--primary)]">
            {formatTime(trip.arrivalAt)}
          </span>
        </div>
      </div>

      {/* Booking details */}
      <div className="mx-4 grid grid-cols-2 gap-3 rounded-xl bg-[var(--surface-alt)] p-4 sm:mx-6 sm:grid-cols-4">
        <div>
          <span className="flex items-center gap-1.5 text-[9px] text-[var(--muted)]">
            <Hash size={12} />
            رقم الحجز
          </span>

          <strong className="mt-1 block text-[11px] font-black text-[var(--text)]">
            {booking.code}
          </strong>
        </div>

        <div>
          <span className="flex items-center gap-1.5 text-[9px] text-[var(--muted)]">
            <CalendarDays size={12} />
            تاريخ الرحلة
          </span>

          <strong className="mt-1 block text-[11px] font-black text-[var(--text)]">
            {formatDate(trip.departureAt)}
          </strong>
        </div>

        <div>
          <span className="flex items-center gap-1.5 text-[9px] text-[var(--muted)]">
            <Armchair size={12} />
            المقاعد
          </span>

          <strong className="mt-1 block text-[11px] font-black text-[var(--text)]">
            {seats.map((seat) => seat.seatNumber).join("، ") || "—"}
          </strong>
        </div>

        <div>
          <span className="flex items-center gap-1.5 text-[9px] text-[var(--muted)]">
            <Users size={12} />
            عدد المسافرين
          </span>

          <strong className="mt-1 block text-[11px] font-black text-[var(--text)]">
            {seats.length}
          </strong>
        </div>
      </div>

      {/* Passenger details */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {seats.map((seat) => (
            <span
              key={seat.id}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[10px] font-bold text-[var(--text)]"
            >
              {seat.passengerName} · مقعد {seat.seatNumber}
            </span>
          ))}
        </div>

        <div className="text-left">
          <span className="block text-[9px] text-[var(--muted)]">
            السعر الإجمالي
          </span>

          <strong className="mt-1 block text-sm font-black text-[var(--primary)]">
            {formatPrice(booking.totalPrice)} ل.س
          </strong>
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex flex-wrap gap-2 border-t border-[var(--border)] p-4 sm:px-6">
        <button
          type="button"
          onClick={() => onShowTicket(booking)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-3 text-[10px] font-black text-white transition hover:brightness-95"
        >
          <Ticket size={15} />
          عرض التذكرة
        </button>

        <button
          type="button"
          onClick={() => onTrack(booking)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[10px] font-black text-[var(--text)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
        >
          <Route size={15} />
          تتبع الرحلة
        </button>
      </div>
    </article>
  );
}

export default BookingCard;
