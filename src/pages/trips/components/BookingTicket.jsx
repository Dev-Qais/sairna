import { useState } from "react";

import { Ticket, ArrowLeft, X, LoaderCircle, Ban } from "lucide-react";

import useCancelBooking from "../../../hooks/bookings/useCancelBooking";

import BookingStatus from "./BookingStatus";

import {
  formatDate,
  formatTime,
  formatPrice,
} from "../utils/bookingFormatters";

function BookingTicket({ booking, onClose }) {
  const trip = booking.trip;
  const seats = booking.seats || [];

  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancelError, setCancelError] = useState("");

  const { cancelBooking, isCancelling } = useCancelBooking();

  const handleCancelBooking = async () => {
    try {
      setCancelError("");

      await cancelBooking(booking.id);

      onClose();
    } catch (error) {
      setCancelError(
        error.response?.data?.message ||
          error.message ||
          "تعذر إلغاء الحجز، حاول مرة أخرى.",
      );
    }
  };

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
                {trip.company?.name?.slice(0, -8) || "غير محدد"}
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
                {seats.map((seat) => seat.seatNumber).join("، ") || "—"}
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

        {/* Cancel Booking */}
        {booking.status === "CONFIRMED" && (
          <div className="mt-5 border-t border-[var(--border)] pt-4">
            {!showCancelConfirm ? (
              <button
                type="button"
                onClick={() => setShowCancelConfirm(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-xs font-black text-red-500 transition hover:bg-red-500/10"
              >
                <Ban size={16} />
                إلغاء الحجز
              </button>
            ) : (
              <div className="space-y-3 rounded-xl border border-red-500/30 bg-red-500/5 p-4">
                <p className="text-sm font-bold text-[var(--text)]">
                  هل أنت متأكد من إلغاء هذا الحجز؟
                </p>

                <p className="text-xs text-[var(--muted)]">
                  يرجى التأكد قبل تنفيذ عملية الإلغاء.
                </p>

                {cancelError && (
                  <p className="text-xs text-red-500">{cancelError}</p>
                )}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleCancelBooking}
                    disabled={isCancelling}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-500 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-red-600 disabled:opacity-50"
                  >
                    {isCancelling && (
                      <LoaderCircle size={15} className="animate-spin" />
                    )}

                    {isCancelling ? "جارٍ الإلغاء..." : "تأكيد الإلغاء"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowCancelConfirm(false);
                      setCancelError("");
                    }}
                    disabled={isCancelling}
                    className="rounded-lg border border-[var(--border)] px-4 py-2.5 text-xs font-bold text-[var(--text)] disabled:opacity-50"
                  >
                    تراجع
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingTicket;
