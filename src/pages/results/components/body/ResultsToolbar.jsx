import { ArrowLeft, ArrowUpDown, CalendarDays, Users } from "lucide-react";
import useCities from "../../../../hooks/cities/useCities";

function ResultsToolbar({ tripsCount = 0, searchData, sortBy, onSortChange }) {
  const { data: cities = [] } = useCities();

  const fromCityName = cities.find(
    (city) => String(city.id) === String(searchData?.fromCity),
  )?.name;

  const toCityName = cities.find(
    (city) => String(city.id) === String(searchData?.toCity),
  )?.name;

  const formatDate = (date) => {
    if (!date) return "";

    return new Intl.DateTimeFormat("ar-SY", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Damascus",
    }).format(new Date(`${date}T12:00:00`));
  };

  return (
    <section>
      <div className="results-heading mt-9 mb-6 mx-0 flex items-end justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-3 text-lg font-black">
            {tripsCount} رحلات متاحة
            {searchData?.fromCity && searchData?.toCity && (
              <span className="inline-flex items-center gap-[6px] rounded-[7px] bg-[var(--soft-teal)] px-[10px] py-[5px] text-[12px] text-[var(--primary-deep)]">
                {fromCityName || "مدينة الانطلاق"}
                <ArrowLeft size={15} />
                {toCityName || "مدينة الوجهة"}
              </span>
            )}
          </h2>

          <p className="mt-2 text-sm text-[var(--muted)]">
            <CalendarDays size={15} className="inline-block ml-1" />

            {searchData?.date
              ? formatDate(searchData.date)
              : "الرحلات المتاحة من تاريخ اليوم"}

            {searchData?.passengers && (
              <>
                {" · "}
                <Users size={14} className="inline-block mx-1" />
                {searchData.passengers} مسافر
              </>
            )}
          </p>
        </div>

        <div className="sort-box flex items-center gap-2.5 text-xs font-extrabold text-[var(--muted)]">
          <label htmlFor="sort-select" className="whitespace-nowrap">
            ترتيب حسب
          </label>

          <div className="flex items-center gap-2">
            <ArrowUpDown size={15} />

            <select
              id="sort-select"
              onChange={(e) => onSortChange(e.target.value)}
              value={sortBy}
              className="min-h-[42px]  rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3 text-xs text-[var(--text)] outline-none"
            >
              <option value="earliest">وقت الانطلاق</option>
              <option value="cheap">أقل سعر</option>
              <option value="quick">أقصر مدة</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResultsToolbar;
