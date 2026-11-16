import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Ticket,
  ArrowLeft,
  XCircle,
  RefreshCw,
  LoaderCircle,
} from "lucide-react";

import useMyBookings from "../../hooks/bookings/useMyBookings";

import BookingCard from "./components/BookingCard";
import BookingTicket from "./components/BookingTicket";

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
