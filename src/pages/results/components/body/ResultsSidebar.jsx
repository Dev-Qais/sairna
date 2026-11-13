import { Filter, RotateCcw, ShieldCheck, Bus } from "lucide-react";

function ResultsSidebar({
  companies = [],
  allTrips = [],
  selectedCompany,
  onSelectCompany,
  departurePeriod,
  onSelectDeparturePeriod,
  onResetFilters,
}) {
  const getCompanyTripsCount = (companyId) => {
    return allTrips.filter(
      (trip) => String(trip.companyId) === String(companyId),
    ).length;
  };

  return (
    <aside className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] max-h-fit p-5">
      {/* Sidebar Header */}
      <div className="mb-5 flex items-center justify-between border-b border-[var(--border)] pb-5">
        <div className="flex items-center gap-2">
          <Filter size={19} />
          <h3 className="text-base font-black">تصفية النتائج</h3>
        </div>

        <button
          type="button"
          className="flex items-center gap-1 text-xs font-bold text-[var(--primary)] cursor-pointer"
          onClick={onResetFilters}
        >
          <RotateCcw size={14} />
          إعادة ضبط
        </button>
      </div>

      {/* Companies Filter */}
      <section className="mb-6">
        <h4 className="mb-3 text-sm font-black">شركة النقل</h4>

        <div className="space-y-3">
          {/* All Companies */}
          <label className="flex cursor-pointer items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="company"
                checked={selectedCompany === "all"}
                onChange={() => onSelectCompany("all")}
              />
              <span className="text-xs">كل الشركات</span>
            </div>

            <span className="text-xs text-[var(--muted)]">
              {allTrips.length}
            </span>
          </label>

          {/* Companies List */}
          {companies.map((company) => (
            <label
              key={company.id}
              className="flex cursor-pointer items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="company"
                  checked={String(selectedCompany) === String(company.id)}
                  onChange={() => onSelectCompany(company.id)}
                />

                <span className="text-xs">{company.name.slice(0, -8)}</span>
              </div>

              <span className="text-xs text-[var(--muted)]">
                {getCompanyTripsCount(company.id)}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* Departure Time Filter */}
      <section className="mb-6">
        <h4 className="mb-3 text-sm font-black">وقت الانطلاق</h4>

        <div className="space-y-3">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="departureTime"
              value="all"
              checked={departurePeriod === "all"}
              onChange={() => onSelectDeparturePeriod("all")}
            />
            <span className="text-xs">كل الأوقات</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="departureTime"
              value="morning"
              checked={departurePeriod === "morning"}
              onChange={() => onSelectDeparturePeriod("morning")}
            />
            <span className="text-xs">صباحاً (قبل 12)</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="departureTime"
              value="afternoon"
              checked={departurePeriod === "afternoon"}
              onChange={() => onSelectDeparturePeriod("afternoon")}
            />
            <span className="text-xs">ظهراً (12–17)</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="departureTime"
              value="evening"
              checked={departurePeriod === "evening"}
              onChange={() => onSelectDeparturePeriod("evening")}
            />
            <span className="text-xs">مساءً (بعد 17)</span>
          </label>
        </div>
      </section>

      {/* Booking Info */}
      <section className="rounded-xl bg-[var(--soft-teal)] p-4">
        <div className="mb-2 flex items-center gap-2">
          <ShieldCheck size={20} className="text-[var(--primary)]" />

          <h4 className="text-sm font-black">الحجز بشكل واضح</h4>
        </div>

        <p className="text-xs leading-6 text-[var(--muted)]">
          كل تفاصيل الرحلة أمامك قبل التأكيد.
        </p>
      </section>
    </aside>
  );
}

export default ResultsSidebar;
