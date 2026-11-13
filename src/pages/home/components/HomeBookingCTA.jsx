import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";

function HomeBookingCTA() {
  const navigate = useNavigate();

  return (
    <section className="bg-[var(--bg)] px-5 pb-16 sm:px-8 sm:pb-20">
      <div
        dir="rtl"
        className="relative mx-auto flex max-w-[1140px] flex-col items-start justify-between gap-7 overflow-hidden rounded-[22px] bg-gradient-to-l from-[var(--primary-deep)] to-[var(--dark)] px-7 py-9 sm:flex-row sm:items-center sm:px-12 sm:py-10"
      >
        {/* Decorative Circles */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 left-[22%] h-56 w-56 rounded-full border border-white/10"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-36 left-[42%] h-64 w-64 rounded-full border border-white/10"
        />

        {/* Content */}
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/90">
            <Sparkles size={14} />
            جاهز تغير جو؟
          </span>

          <h2 className="mt-4 text-2xl font-black text-white sm:text-3xl">
            الطريق الجاي بيناديك.
          </h2>

          <p className="mt-2 text-sm text-white/90">
            دوّر على رحلة واحجز أول مقعد إلك.
          </p>
        </div>

        {/* Action */}
        <button
          type="button"
          onClick={() => navigate("/results")}
          className="group relative z-10 inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-[var(--dark)] shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
        >
          يلا نلاقي رحلة
          <ArrowLeft
            size={17}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
        </button>
      </div>
    </section>
  );
}

export default HomeBookingCTA;
