import {
  Armchair,
  Bus,
  Gauge,
  Info,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";

import useTripSeats from "../../../../hooks/trips/useTripSeats";

function SeatSelection({
  tripId,
  selectedSeats,
  onSeatsChange,
  passengerCount = 1,
}) {
  const { data: seatsData, isPending, isError, refetch } = useTripSeats(tripId);

  if (isPending) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        <LoaderCircle
          size={30}
          className="animate-spin text-[var(--primary)]"
        />
        <p className="text-sm font-bold text-[var(--muted)]">
          جاري تحميل مخطط المقاعد...
        </p>
      </div>
    );
  }

  if (isError || !seatsData) {
    return (
      <div className="flex min-h-[350px] flex-col items-center justify-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center">
        <Info size={30} className="text-red-500" />

        <div>
          <h3 className="font-black text-[var(--text)]">تعذر تحميل المقاعد</h3>
          <p className="mt-1 text-sm text-[var(--muted)]">
            تأكد من اتصالك بالإنترنت وحاول مرة أخرى.
          </p>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
        >
          <RefreshCw size={16} />
          إعادة المحاولة
        </button>
      </div>
    );
  }

  const totalSeats = Number(seatsData.totalSeats) || 0;
  const occupiedSeats = seatsData.occupiedSeats || [];

  const availableSeats =
    seatsData.availableSeats ?? totalSeats - occupiedSeats.length;

  const isOccupied = (seatNumber) => occupiedSeats.includes(seatNumber);

  const toggleSeat = (seatNumber) => {
    if (isOccupied(seatNumber)) return;

    const isSelected = selectedSeats.includes(seatNumber);

    if (isSelected) {
      onSeatsChange(selectedSeats.filter((seat) => seat !== seatNumber));
      return;
    }

    // عدد المقاعد يجب أن يساوي عدد المسافرين
    if (selectedSeats.length >= passengerCount) return;

    onSeatsChange([...selectedSeats, seatNumber]);
  };

  const getSeatState = (seatNumber) => {
    if (isOccupied(seatNumber)) return "busy";
    if (selectedSeats.includes(seatNumber)) return "selected";
    return "available";
  };

  const getSeatStyle = (seatNumber) => {
    const state = getSeatState(seatNumber);

    const base =
      "relative flex h-[43px] min-w-0 flex-col items-center justify-center rounded-[9px] border transition-all duration-200";

    if (state === "busy") {
      return `${base} cursor-not-allowed border-[#d9e2e5] bg-[#e8eef0] text-[#b1c0c6] dark:border-[var(--border)] dark:bg-[var(--surface-alt)] dark:text-[var(--muted)]`;
    }

    if (state === "selected") {
      return `${base} border-[var(--primary)] bg-[var(--primary)] text-white shadow-[0_4px_12px_rgba(10,169,155,0.2)]`;
    }

    return `${base} cursor-pointer border-[#b9d6df] bg-white text-[#7d9eaa] hover:border-[var(--primary)] hover:bg-[var(--soft-teal)] dark:border-[var(--border)] dark:bg-[var(--surface)] dark:text-[var(--muted)]`;
  };

  const sortedSelectedSeats = [...selectedSeats].sort((a, b) => a - b);

  return (
    <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_220px]">
      {/* Bus map */}
      <div className="min-w-0 rounded-[22px] border border-[var(--border)] bg-[#f1f6f7] p-3 sm:p-5 dark:bg-[var(--surface-alt)]">
        {/* Bus front */}
        <div className="mb-4 flex items-center justify-between border-b border-dashed border-[#cbdde2] pb-4 dark:border-[var(--border)]">
          <span className="flex items-center gap-2 text-xs font-bold text-[var(--muted)]">
            <Bus size={19} />
            مقدمة الحافلة
          </span>

          <span className="text-[var(--muted)]">
            <Gauge size={25} />
          </span>
        </div>

        {/* Seats cabin */}
        <div className="space-y-2.5">
          {Array.from({ length: Math.ceil(totalSeats / 4) }, (_, rowIndex) => {
            const rowSeats = Array.from(
              { length: 4 },
              (_, seatIndex) => rowIndex * 4 + seatIndex + 1,
            ).filter((seatNumber) => seatNumber <= totalSeats);

            return (
              <div
                key={rowIndex}
                className="grid grid-cols-[22px_repeat(2,minmax(0,1fr))_18px_repeat(2,minmax(0,1fr))] items-center gap-1.5 sm:gap-2"
              >
                <span className="text-center text-[9px] font-bold text-[var(--muted)]">
                  {String(rowIndex + 1).padStart(2, "0")}
                </span>

                {rowSeats.slice(0, 2).map((seatNumber) => (
                  <button
                    key={seatNumber}
                    type="button"
                    disabled={
                      isOccupied(seatNumber) ||
                      (selectedSeats.length >= passengerCount &&
                        !selectedSeats.includes(seatNumber))
                    }
                    onClick={() => toggleSeat(seatNumber)}
                    className={getSeatStyle(seatNumber)}
                    aria-label={`المقعد ${seatNumber}`}
                    aria-pressed={selectedSeats.includes(seatNumber)}
                  >
                    <Armchair size={19} strokeWidth={1.6} />
                    <small className="text-[8px] font-bold leading-none">
                      {seatNumber}
                    </small>
                  </button>
                ))}

                <span aria-hidden="true" />

                {rowSeats.slice(2, 4).map((seatNumber) => (
                  <button
                    key={seatNumber}
                    type="button"
                    disabled={
                      isOccupied(seatNumber) ||
                      (selectedSeats.length >= passengerCount &&
                        !selectedSeats.includes(seatNumber))
                    }
                    onClick={() => toggleSeat(seatNumber)}
                    className={getSeatStyle(seatNumber)}
                    aria-label={`المقعد ${seatNumber}`}
                    aria-pressed={selectedSeats.includes(seatNumber)}
                  >
                    <Armchair size={19} strokeWidth={1.6} />
                    <small className="text-[8px] font-bold leading-none">
                      {seatNumber}
                    </small>
                  </button>
                ))}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-[#d7e4e7] pt-4 text-[10px] font-bold text-[var(--muted)] dark:border-[var(--border)]">
          <span className="flex items-center gap-1.5">
            <i className="h-2.5 w-2.5 rounded-[3px] border border-[#b9d6df] bg-white" />
            متاح
          </span>

          <span className="flex items-center gap-1.5">
            <i className="h-2.5 w-2.5 rounded-[3px] bg-[var(--primary)]" />
            مختار
          </span>

          <span className="flex items-center gap-1.5">
            <i className="h-2.5 w-2.5 rounded-[3px] bg-[#d5e0e4]" />
            محجوز
          </span>
        </div>
      </div>

      {/* Selection information */}
      <div className="flex min-w-0 flex-col gap-4">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--soft-teal)] text-[var(--primary)]">
            <Armchair size={21} />
          </div>

          <h3 className="text-sm font-black text-[var(--text)]">
            مكانك، راحتك.
          </h3>

          <p className="mt-2 text-[11px] leading-6 text-[var(--muted)]">
            اختار مقعدك حسب تفضيلك. المكان عند الشباك أو بالممر، الخيار إلك.
          </p>

          <div className="my-5 flex items-center justify-between border-t border-[var(--border)] pt-4">
            <span className="text-[11px] font-bold text-[var(--muted)]">
              المقاعد المختارة
            </span>

            <strong className="text-sm font-black text-[var(--primary)]">
              {selectedSeats.length} / {passengerCount}
            </strong>
          </div>

          <div className="flex flex-wrap gap-2">
            {sortedSelectedSeats.length > 0 ? (
              sortedSelectedSeats.map((seatNumber) => (
                <span
                  key={seatNumber}
                  className="rounded-lg bg-[var(--soft-teal)] px-3 py-1.5 text-xs font-black text-[var(--primary-deep)]"
                >
                  مقعد {seatNumber}
                </span>
              ))
            ) : (
              <span className="text-[11px] text-[var(--muted)]">
                لسا ما اخترت مقعد
              </span>
            )}
          </div>
        </div>

        <div className="flex items-start gap-2 rounded-xl bg-[var(--soft-teal)] p-3 text-[11px] font-bold leading-6 text-[var(--primary-deep)]">
          <Info size={17} className="mt-1 shrink-0" />
          <span>لتكمل، اختار عدد مقاعد مساوي لعدد المسافرين.</span>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[var(--muted)]">المقاعد المتاحة</span>
            <strong className="font-black text-[var(--primary)]">
              {availableSeats}
            </strong>
          </div>

          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--surface-alt)]">
            <div
              className="h-full rounded-full bg-[var(--primary)] transition-all"
              style={{
                width: `${
                  totalSeats > 0 ? (availableSeats / totalSeats) * 100 : 0
                }%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeatSelection;
