import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaExchangeAlt,
  FaSearch,
  FaExclamationCircle,
} from "react-icons/fa";

import useCities from "../../../hooks/cities/useCities";
import Eyebrow from "../../../components/ui/Eyebrow";
import { useNavigate } from "react-router-dom";
import useSearchStore from "../../../store/useSearchStore";

function SearchBox({ showHeader = true }) {
  // Cities API
  const { data: cities = [], isPending, isError, error, refetch } = useCities();

  // Form State
  const [inputForm, setInputForm] = useState({
    fromCity: "",
    toCity: "",
    date: getTodayDate(),
    passengers: "1",
  });

  const fromCity = inputForm.fromCity || String(cities[1]?.id ?? "");
  const toCity = inputForm.toCity || String(cities[0]?.id ?? "");

  // Validation State
  const [validationError, setValidationError] = useState("");

  const setSearchData = useSearchStore((state) => state.setSearchData);

  const navigate = useNavigate();
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    setValidationError("");
  };

  // Swap cities
  const swapCities = () => {
    setInputForm((prevForm) => ({
      ...prevForm,
      fromCity: toCity,
      toCity: fromCity,
    }));

    setValidationError("");
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();

    if (!fromCity || !toCity) {
      setValidationError("يرجى اختيار مدينتي الانطلاق والوصول");
      return;
    }

    if (fromCity === toCity) {
      setValidationError("مدينة الانطلاق والوصول يجب أن تكونا مختلفتين");
      return;
    }

    if (!inputForm.date) {
      setValidationError("يرجى اختيار تاريخ الرحلة");
      return;
    }

    const searchData = {
      fromCity: Number(fromCity),
      toCity: Number(toCity),
      date: inputForm.date,
      passengers: Number(inputForm.passengers),
    };

    setSearchData(searchData);
    navigate("/results");
  };

  // Shared field styles
  const fieldClass = `
    flex items-center gap-3
    min-w-0 min-h-[50px]
    rounded-xl border border-[var(--border)]
    bg-[var(--surface)]
    px-3 py-2
    transition-all duration-200
    focus-within:border-[var(--primary)]
    focus-within:ring-2
    focus-within:ring-[var(--primary)]/10
  `;

  // Loading state
  if (isPending) {
    return (
      <div className="relative z-10 rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[0_15px_45px_rgba(10,50,60,0.08)]">
        <div className="flex min-h-[110px] flex-col items-center justify-center gap-3">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--primary)]" />

          <p className="text-sm font-bold text-[var(--muted)]">
            جاري تحميل المدن...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="relative z-10 rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_15px_45px_rgba(10,50,60,0.08)]">
        <div className="flex min-h-[110px] flex-col items-center justify-center gap-3 text-center">
          <FaExclamationCircle className="text-3xl text-red-500" />

          <p className="text-sm font-bold text-[var(--text)]">
            تعذّر تحميل المدن
          </p>

          <p className="text-xs text-[var(--muted)]">
            {error?.message || "حدث خطأ أثناء الاتصال بالخادم"}
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-xl bg-[var(--primary)] px-5 py-2 text-sm font-bold text-white transition-all hover:brightness-110"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  // Empty cities state
  if (cities.length < 2) {
    return (
      <div className="relative z-10 rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-6 text-center shadow-[0_15px_45px_rgba(10,50,60,0.08)]">
        <p className="text-sm font-bold text-[var(--muted)]">
          لا توجد مدن متاحة للبحث حالياً
        </p>
      </div>
    );
  }

  function getTodayDate() {
    const today = new Date();
    const offset = today.getTimezoneOffset();

    return new Date(today.getTime() - offset * 60 * 1000)
      .toISOString()
      .split("T")[0];
  }

  return (
    <section
      className="
        relative z-10
        rounded-[22px]
        border border-[var(--border)]
        bg-[var(--surface)]
        p-4 sm:p-5
        shadow-[0_15px_45px_rgba(10,50,60,0.08)]
      "
    >
      {/* Header */}
      {showHeader && (
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-[15px]">وين رحلتك الجاية؟</h3>

            <p className="mt-1 text-[11px] text-[var(--muted)]">
              اختار وجهتك وباقي التفاصيل علينا
            </p>
          </div>

          <Eyebrow>الحجز بـ 3 خطوات</Eyebrow>
        </div>
      )}

      <form onSubmit={handleSearch}>
        {/* Search Fields */}
        <div
          className="
            grid grid-cols-2 gap-2
            lg:grid-cols-[1.12fr_1fr_0.74fr_1.14fr]
            lg:gap-[9px]
          "
        >
          {/* Cities Group */}
          <div
            className="
              col-span-2
              grid grid-cols-[minmax(0,1fr)_36px_minmax(0,1fr)]
              items-center gap-2
              lg:col-span-1
            "
          >
            {/* From City */}
            <label className={fieldClass}>
              <FaMapMarkerAlt className="shrink-0 text-[var(--primary)]" />

              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-[10px] text-[var(--muted)]">من وين؟</span>

                <select
                  name="fromCity"
                  value={fromCity}
                  onChange={handleInputChange}
                  className="w-full min-w-0 bg-transparent text-sm font-bold outline-none"
                  required
                >
                  {cities.map((city) => (
                    <option
                      key={city.id}
                      value={String(city.id)}
                      className="text-[var(--primary)]"
                    >
                      {city.name}
                    </option>
                  ))}
                </select>
              </span>
            </label>

            {/* Swap Cities */}
            <button
              type="button"
              onClick={swapCities}
              aria-label="تبديل المدن"
              className="
                grid h-10 w-9 place-items-center
                self-center rounded-xl
                bg-[var(--soft-teal)]
                text-[var(--primary)]
                transition-transform duration-500
                hover:rotate-180
                active:scale-95
              "
            >
              <FaExchangeAlt />
            </button>

            {/* To City */}
            <label className={fieldClass}>
              <FaMapMarkerAlt className="shrink-0 text-[var(--primary)]" />

              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-[10px] text-[var(--muted)]">لوين؟</span>

                <select
                  name="toCity"
                  value={toCity}
                  onChange={handleInputChange}
                  className="w-full min-w-0 bg-transparent text-sm font-bold outline-none"
                  required
                >
                  {cities.map((city) => (
                    <option
                      key={city.id}
                      value={String(city.id)}
                      className="text-[var(--primary)]"
                    >
                      {city.name}
                    </option>
                  ))}
                </select>
              </span>
            </label>
          </div>

          {/* Date */}
          <label className={fieldClass}>
            <FaCalendarAlt className="shrink-0 text-[var(--primary)]" />

            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-[10px] text-[var(--muted)]">
                تاريخ الرحلة
              </span>

              <input
                type="date"
                name="date"
                min={getTodayDate()}
                value={inputForm.date}
                onChange={handleInputChange}
                className="w-full min-w-0 bg-transparent text-xs font-bold outline-none"
                required
              />
            </span>
          </label>

          {/* Passengers */}
          <label className={fieldClass}>
            <FaUsers className="shrink-0 text-[var(--primary)]" />

            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-[10px] text-[var(--muted)]">المسافرين</span>

              <select
                name="passengers"
                value={inputForm.passengers}
                onChange={handleInputChange}
                className="w-full min-w-0 bg-transparent text-sm font-bold outline-none"
                required
              >
                {[1, 2, 3, 4].map((count) => (
                  <option
                    key={count}
                    value={count}
                    className="text-[var(--primary)]"
                  >
                    {count} مسافر
                  </option>
                ))}
              </select>
            </span>
          </label>

          {/* Search Button */}
          <button
            type="submit"
            className="
              col-span-2
              flex min-h-[48px] w-full
              items-center justify-center gap-3
              rounded-xl
              bg-[var(--primary)]
              text-sm font-extrabold text-white
              transition-all duration-200
              hover:brightness-110
              active:scale-[0.99]
              lg:col-span-1
            "
          >
            ابحث عن رحلات
            <FaSearch />
          </button>
        </div>

        {/* Validation Error */}
        {validationError && (
          <p
            role="alert"
            className="mt-3 text-center text-xs font-bold text-red-500"
          >
            {validationError}
          </p>
        )}
      </form>
    </section>
  );
}

export default SearchBox;
