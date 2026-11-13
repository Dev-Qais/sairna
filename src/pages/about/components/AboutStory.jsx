import { ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import aboutImage from "../../../assets/image.jpg";

function AboutStory() {
  const navigate = useNavigate();

  return (
    <section
      dir="rtl"
      className="mx-auto grid w-full max-w-[1056px] grid-cols-1 items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-20"
    >
      {/* Story Content */}
      <div className="order-1 min-w-0">
        <h2 className="text-2xl font-black leading-relaxed text-[var(--text)] sm:text-3xl">
          فكرة صغيرة... تجربة كبيرة.
        </h2>

        <p className="mt-4 text-sm leading-8 text-[var(--muted)]">
          بدأنا تجربة بسيطة للمستخدم من لحظة اختيار مدينة الانطلاق والوصول،
          مروراً بمقارنة الشركات، اختيار المقاعد، تأكيد التذكرة، ومشاهدة مسار
          الرحلة على الخريطة.
        </p>

        <button
          type="button"
          onClick={() => navigate("/results")}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--bg-hover)]"
        >
          جرّب رحلة
          <ArrowLeft size={17} />
        </button>
      </div>

      {/* Story Image */}
      <div className="order-2 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface-alt)] shadow-[var(--shadow)]">
        <img
          src={aboutImage}
          alt="منظر البحر عند غروب الشمس"
          loading="lazy"
          className="h-[280px] w-full object-cover sm:h-[360px] lg:h-[380px]"
        />
      </div>
    </section>
  );
}

export default AboutStory;
