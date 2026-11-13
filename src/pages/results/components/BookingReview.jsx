import {
  Bus,
  CalendarDays,
  MapPin,
  Armchair,
  Users,
  Wallet,
} from "lucide-react";

function BookingReview({ trip, selectedSeats, passengers }) {
  const formatTime = (date) => {
    if (!date) return "--:--";

    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Damascus",
    }).format(new Date(date));
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

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US").format(price || 0);

  const totalPrice = Number(trip.price || 0) * selectedSeats.length;

  return (
    <section className="space-y-5">
      {/* Trip information */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--soft-teal)] text-[var(--primary)]">
            <Bus size={20} />
          </span>

          <div>
            <h2 className="font-black text-[var(--text)]">تفاصيل الرحلة</h2>
            <p className="text-xs text-[var(--muted)]">
              راجع معلومات رحلتك قبل المتابعة
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-xs text-[var(--muted)]">شركة النقل</p>
            <p className="font-black text-[var(--text)]">
              {trip.company?.name || "شركة النقل"}
            </p>
          </div>

          <div>
            <p className="mb-1 text-xs text-[var(--muted)]">رقم الرحلة</p>
            <p className="font-black text-[var(--text)]">
              {trip.code || trip.id}
            </p>
          </div>

          <div>
            <p className="mb-1 flex items-center gap-2 text-xs text-[var(--muted)]">
              <MapPin size={14} />
              مدينة الانطلاق
            </p>
            <p className="font-black text-[var(--text)]">
              {trip.origin?.name || "غير محدد"}
            </p>
            <p className="text-sm text-[var(--muted)]">
              {formatTime(trip.departureAt)}
            </p>
          </div>

          <div>
            <p className="mb-1 flex items-center gap-2 text-xs text-[var(--muted)]">
              <MapPin size={14} />
              مدينة الوصول
            </p>
            <p className="font-black text-[var(--text)]">
              {trip.destination?.name || "غير محدد"}
            </p>
            <p className="text-sm text-[var(--muted)]">
              {formatTime(trip.arrivalAt)}
            </p>
          </div>

          <div>
            <p className="mb-1 flex items-center gap-2 text-xs text-[var(--muted)]">
              <CalendarDays size={14} />
              موعد الرحلة
            </p>
            <p className="font-black text-[var(--text)]">
              {formatDate(trip.departureAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Seats */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
        <div className="mb-4 flex items-center gap-3">
          <Armchair size={20} className="text-[var(--primary)]" />
          <h2 className="font-black text-[var(--text)]">المقاعد المختارة</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {[...selectedSeats]
            .sort((a, b) => a - b)
            .map((seat) => (
              <span
                key={seat}
                className="rounded-lg bg-[var(--soft-teal)] px-4 py-2 text-sm font-black text-[var(--primary-deep)]"
              >
                مقعد {seat}
              </span>
            ))}
        </div>
      </div>

      {/* Passengers */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
        <div className="mb-4 flex items-center gap-3">
          <Users size={20} className="text-[var(--primary)]" />
          <h2 className="font-black text-[var(--text)]">بيانات المسافرين</h2>
        </div>

        <div className="space-y-3">
          {passengers.map((passenger, index) => (
            <div
              key={passenger.seatNumber}
              className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] pb-3 last:border-0 last:pb-0"
            >
              <div>
                <p className="font-bold text-[var(--text)]">
                  {passenger.fullName}
                </p>
                <p className="text-xs text-[var(--muted)]" dir="ltr">
                  {passenger.phone}
                </p>
              </div>

              <span className="text-xs font-black text-[var(--primary)]">
                المقعد {passenger.seatNumber}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="rounded-2xl border border-[var(--primary)] bg-[var(--soft-teal)] p-5">
        <div className="mb-3 flex items-center gap-2 text-[var(--primary-deep)]">
          <Wallet size={20} />
          <h2 className="font-black">ملخص التكلفة</h2>
        </div>

        <div className="flex justify-between gap-3 text-sm text-[var(--text)]">
          <span>سعر المقعد الواحد</span>
          <span className="font-bold">{formatPrice(trip.price)} ل.س</span>
        </div>

        <div className="mt-2 flex justify-between gap-3 text-sm text-[var(--text)]">
          <span>عدد المقاعد</span>
          <span className="font-bold">{selectedSeats.length}</span>
        </div>

        <div className="my-4 border-t border-[var(--primary)]/20" />

        <div className="flex items-center justify-between gap-3">
          <span className="font-black text-[var(--text)]">الإجمالي</span>
          <strong className="text-xl font-black text-[var(--primary-deep)]">
            {formatPrice(totalPrice)} ل.س
          </strong>
        </div>
      </div>
    </section>
  );
}

export default BookingReview;
