import { UserRound, Phone } from "lucide-react";

function PassengerDetails({ passengers, onPassengersChange }) {
  const updatePassenger = (index, field, value) => {
    const updatedPassengers = passengers.map((passenger, i) =>
      i === index ? { ...passenger, [field]: value } : passenger,
    );

    onPassengersChange(updatedPassengers);
  };

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-black text-[var(--text)]">
          بيانات المسافرين
        </h2>

        <p className="mt-1 text-sm text-[var(--muted)]">
          أدخل بيانات كل مسافر بحسب المقعد الذي اختاره.
        </p>
      </div>

      <div className="space-y-5">
        {passengers.map((passenger, index) => (
          <div
            key={passenger.seatNumber}
            className="rounded-xl border border-[var(--border)] p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-black text-[var(--text)]">
                المسافر {index + 1}
              </h3>

              <span className="rounded-lg bg-[var(--soft-teal)] px-3 py-1 text-xs font-black text-[var(--primary-deep)]">
                المقعد {passenger.seatNumber}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-bold text-[var(--text)]">
                  <UserRound size={16} />
                  الاسم الكامل
                </span>

                <input
                  type="text"
                  value={passenger.fullName}
                  onChange={(event) =>
                    updatePassenger(index, "fullName", event.target.value)
                  }
                  placeholder="أدخل الاسم الكامل"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--primary)]"
                />
              </label>

              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-bold text-[var(--text)]">
                  <Phone size={16} />
                  رقم الهاتف
                </span>

                <input
                  type="tel"
                  dir="ltr"
                  required
                  maxLength={18}
                  value={passenger.phone}
                  onChange={(event) =>
                    updatePassenger(index, "phone", event.target.value)
                  }
                  placeholder="0912345678"
                  pattern="^[+0-9\s-]{9,18}$"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-left text-sm text-[var(--text)] outline-none transition focus:border-[var(--primary)]"
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PassengerDetails;
