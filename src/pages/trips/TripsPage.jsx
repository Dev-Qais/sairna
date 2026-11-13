import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Ticket,
  Bus,
  CalendarDays,
  Clock3,
  MapPin,
  Armchair,
  Users,
  ArrowLeft,
  ArrowRight,
  Route,
  X,
  CheckCircle2,
  Clock,
  XCircle,
  RefreshCw,
  LoaderCircle,
  Hash,
  Phone,
  Info,
} from "lucide-react";

import useMyBookings from "../../hooks/bookings/useMyBookings";

const bookingStatus = {
  CONFIRMED: {
    label: "مؤكد",
    icon: CheckCircle2,
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  PENDING: {
    label: "قيد الانتظار",
    icon: Clock,
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  CANCELLED: {
    label: "ملغي",
    icon: XCircle,
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

const formatDate = (date) => {
  if (!date) return "غير محدد";

  return new Intl.DateTimeFormat("ar-SY", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Damascus",
  }).format(new Date(date));
};

const formatTime = (date) => {
  if (!date) return "--:--";

  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Damascus",
  }).format(new Date(date));
};

const formatPrice = (price) =>
  new Intl.NumberFormat("en-US").format(Number(price) || 0);

function BookingStatus({ status }) {
  const config = bookingStatus[status] || {
    label: status || "غير معروف",
    icon: Info,
    className: "bg-gray-100 text-gray-600 border-gray-200",
  };

  const StatusIcon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-black ${config.className}`}
    >
      <StatusIcon size={13} />
      {config.label}
    </span>
  );
}

function BookingTicket({ booking, onClose }) {
  const trip = booking.trip;
  const seats = booking.seats || [];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="تفاصيل التذكرة"
        className="relative max-h-[90vh] w-full max-w-[430px] overflow-y-auto rounded-3xl bg-[var(--surface)] p-5 shadow-2xl sm:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق"
          className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface-alt)] text-[var(--muted)] transition hover:text-[var(--primary)]"
        >
          <X size={18} />
        </button>

        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--soft-teal)] text-[var(--primary)]">
            <Ticket size={27} />
          </div>

          <h2 className="text-xl font-black text-[var(--text)]">تذكرة رحلتك</h2>

          <p className="mt-1 text-xs text-[var(--muted)]">
            احتفظ بتفاصيل حجزك للوصول إليها عند الحاجة.
          </p>
        </div>

        <div className="rounded-2xl border border-dashed border-[var(--primary)]/40 bg-[var(--surface-alt)] p-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[10px] font-bold text-[var(--muted)]">
              رقم الحجز
            </span>

            <strong className="text-sm font-black text-[var(--primary)]">
              {booking.code}
            </strong>
          </div>

          <div className="mb-4 border-t border-dashed border-[var(--border)]" />

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            <div>
              <span className="text-[10px] text-[var(--muted)]">الانطلاق</span>
              <h3 className="mt-1 text-lg font-black text-[var(--text)]">
                {trip.origin?.name}
              </h3>
              <span className="text-xs text-[var(--primary)]">
                {formatTime(trip.departureAt)}
              </span>
            </div>

            <ArrowLeft size={22} className="text-[var(--primary)]" />

            <div className="text-left">
              <span className="text-[10px] text-[var(--muted)]">الوصول</span>
              <h3 className="mt-1 text-lg font-black text-[var(--text)]">
                {trip.destination?.name}
              </h3>
              <span className="text-xs text-[var(--primary)]">
                {formatTime(trip.arrivalAt)}
              </span>
            </div>
          </div>

          <div className="my-4 border-t border-dashed border-[var(--border)]" />

          <div className="space-y-3">
            <div className="flex justify-between gap-3 text-xs">
              <span className="text-[var(--muted)]">الشركة</span>
              <strong className="text-[var(--text)]">
                {trip.company?.name.slice(0, -8) || "غير محدد"}
              </strong>
            </div>

            <div className="flex justify-between gap-3 text-xs">
              <span className="text-[var(--muted)]">التاريخ</span>
              <strong className="text-[var(--text)]">
                {formatDate(trip.departureAt)}
              </strong>
            </div>

            <div className="flex justify-between gap-3 text-xs">
              <span className="text-[var(--muted)]">المقاعد</span>
              <strong className="text-[var(--text)]">
                {seats.map((seat) => seat.seatNumber).join("، ")}
              </strong>
            </div>

            <div className="flex justify-between gap-3 text-xs">
              <span className="text-[var(--muted)]">المسافرون</span>
              <strong className="text-[var(--text)]">{seats.length}</strong>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-[var(--soft-teal)] p-4">
          <span className="text-xs font-bold text-[var(--primary-deep)]">
            المبلغ الإجمالي
          </span>

          <strong className="text-lg font-black text-[var(--primary-deep)]">
            {formatPrice(booking.totalPrice)} ل.س
          </strong>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <BookingStatus status={booking.status} />
          <span className="text-[10px] text-[var(--muted)]">
            {booking.code}
          </span>
        </div>
      </div>
    </div>
  );
}

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

function TripsPage() {
  const navigate = useNavigate();

  const [selectedBooking, setSelectedBooking] = useState(null);

  const {
    data: bookings,
    isPending,
    isError,
    error,
    refetch,
    isFetching,
  } = useMyBookings();

  const safeBookings = Array.isArray(bookings) ? bookings : [];

  const handleTrack = (booking) => {
    navigate("/tracking", {
      state: {
        booking,
      },
    });
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] pb-16">
      <section className="container py-8 sm:py-10">
        {/* Heading */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-[var(--soft-teal)] px-3 py-1.5 text-[10px] font-black text-[var(--primary-deep)]">
              <Ticket size={13} />
              كل رحلاتك بمكان واحد
            </span>

            <h1 className="text-2xl font-black text-[var(--text)] sm:text-3xl">
              تذاكرك <span className="text-[var(--primary)]">دايماً معك.</span>
            </h1>

            <p className="mt-2 text-xs leading-6 text-[var(--muted)]">
              تابع حجوزاتك وراجع تفاصيل رحلاتك بكل سهولة.
            </p>
          </div>

          {!isPending && !isError && (
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5">
                <span className="block text-[9px] text-[var(--muted)]">
                  إجمالي الحجوزات
                </span>

                <strong className="mt-1 block text-lg font-black text-[var(--primary)]">
                  {safeBookings.length}
                </strong>
              </div>

              <button
                type="button"
                onClick={() => refetch()}
                disabled={isFetching}
                aria-label="تحديث الحجوزات"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--primary)] transition hover:bg-[var(--soft-teal)] disabled:opacity-50"
              >
                <RefreshCw
                  size={17}
                  className={isFetching ? "animate-spin" : ""}
                />
              </button>
            </div>
          )}
        </div>

        {/* Loading */}
        {isPending && (
          <div className="flex min-h-72 flex-col items-center justify-center gap-3 rounded-[22px] border border-[var(--border)] bg-[var(--surface)]">
            <LoaderCircle
              size={32}
              className="animate-spin text-[var(--primary)]"
            />

            <p className="text-xs font-bold text-[var(--muted)]">
              جاري تحميل حجوزاتك...
            </p>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="flex min-h-72 flex-col items-center justify-center gap-4 rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
              <XCircle size={26} />
            </div>

            <h2 className="font-black text-[var(--text)]">
              تعذر تحميل حجوزاتك
            </h2>

            <p className="max-w-md text-xs leading-6 text-[var(--muted)]">
              {error?.response?.data?.message ||
                error?.message ||
                "حدث خطأ أثناء الاتصال بالخادم."}
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-xs font-black text-white"
            >
              <RefreshCw size={15} />
              إعادة المحاولة
            </button>
          </div>
        )}

        {/* Empty state */}
        {!isPending && !isError && safeBookings.length === 0 && (
          <div className="flex min-h-80 flex-col items-center justify-center rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--soft-teal)] text-[var(--primary)]">
              <Ticket size={30} />
            </div>

            <h2 className="text-base font-black text-[var(--text)]">
              ما عندك حجوزات حالياً
            </h2>

            <p className="mt-2 max-w-sm text-xs leading-6 text-[var(--muted)]">
              لسا ما حجزت أي رحلة. ابدأ رحلتك القادمة معنا!
            </p>

            <Link
              to="/"
              className="mt-5 flex items-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 text-xs font-black text-white transition hover:brightness-95"
            >
              احجز رحلة جديدة
              <ArrowLeft size={15} />
            </Link>
          </div>
        )}

        {/* Bookings */}
        {!isPending && !isError && safeBookings.length > 0 && (
          <div className="space-y-5">
            {safeBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onShowTicket={setSelectedBooking}
                onTrack={handleTrack}
              />
            ))}
          </div>
        )}
      </section>

      {/* Ticket modal */}
      {selectedBooking && (
        <BookingTicket
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </main>
  );
}

export default TripsPage;
