import { useLocation, Link, Navigate } from "react-router-dom";
import { Check, Ticket, Route } from "lucide-react";

function BookingSuccess() {
  const { state } = useLocation();

  if (!state?.booking || !state?.trip) {
    return <Navigate to="/results" replace />;
  }

  const { booking, trip, selectedSeats } = state;

  const bookingNumber =
    booking?.bookingNumber ||
    booking?.booking?.bookingNumber ||
    booking?.code ||
    booking?.booking?.code ||
    booking?.id ||
    booking?.booking?.id ||
    "قيد المعالجة";

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[var(--bg)] px-4 py-12">
      <section className="w-full max-w-[400px] rounded-[22px] border border-[var(--border)] bg-[var(--surface)] px-6 py-8 text-center shadow-[var(--shadow)] sm:px-8">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <Check size={30} strokeWidth={2.5} />
        </div>

        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-[var(--soft-teal)] px-3 py-1.5 text-[10px] font-black text-[var(--primary-deep)]">
          <Ticket size={12} />
          تم الحجز بنجاح
        </span>

        <h1 className="mb-2 text-xl font-black text-[var(--text)] sm:text-2xl">
          يا سلام! <span className="text-[var(--primary)]">تم تأكيد حجزك.</span>
        </h1>

        <p className="mb-6 text-[10px] leading-6 text-[var(--muted)]">
          أُضيفت رحلتك إلى حجوزاتي، يمكنك متابعة تفاصيل الرحلة والتذكرة من
          حسابك.
        </p>

        <div className="grid grid-cols-3 items-center rounded-xl border border-dashed border-[var(--primary)]/30 bg-[var(--surface-alt)] px-3 py-4">
          <div className="border-l border-dashed border-[var(--border)] px-1">
            <span className="mb-2 block text-[9px] text-[var(--muted)]">
              رقم الحجز
            </span>
            <strong className="break-all text-[10px] font-black text-[var(--text)]">
              {bookingNumber}
            </strong>
          </div>

          <div className="border-l border-dashed border-[var(--border)] px-1">
            <span className="mb-2 block text-[9px] text-[var(--muted)]">
              الوجهة
            </span>
            <strong className="text-[10px] font-black text-[var(--text)]">
              {trip.origin?.name} ← {trip.destination?.name}
            </strong>
          </div>

          <div className="px-1">
            <span className="mb-2 block text-[9px] text-[var(--muted)]">
              المقاعد
            </span>
            <strong className="text-[10px] font-black text-[var(--text)]">
              {selectedSeats.join("، ")}
            </strong>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Link
            to="/trips"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-[10px] font-black text-white shadow-lg transition hover:brightness-95"
          >
            <Ticket size={14} />
            عرض التذكرة
          </Link>

          <Link
            to="/tracking"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-[10px] font-black text-[var(--text)] transition hover:bg-[var(--surface-alt)]"
          >
            <Route size={14} />
            تتبع الرحلة
          </Link>
        </div>
      </section>
    </main>
  );
}

export default BookingSuccess;
