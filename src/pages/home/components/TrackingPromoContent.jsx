import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";

function TrackingPromoContent() {
  const navigate = useNavigate();

  return (
    <div
      dir="rtl"
      className="flex h-full flex-col justify-center bg-[var(--surface-alt)] p-7 sm:p-10 lg:p-12"
    >
      <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--soft-teal)] px-3 py-1.5 text-xs font-bold text-[var(--primary)]">
        <Sparkles size={14} />
        وين وصلت الرحلة؟
      </span>

      <h2 className="text-2xl font-black leading-relaxed text-[var(--text)] sm:text-3xl">
        الطريق قدامك.
        <span className="block text-[var(--primary)]">لحظة بلحظة!</span>
      </h2>

      <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
        بصفحة التتبع بتشوف خط سير الرحلة ومحطاتها وحالتها ضمن نموذج تفاعلي سهل
        وواضح.
      </p>

      <ul className="mt-5 space-y-3">
        <li className="flex items-center gap-2 text-xs font-bold text-[var(--text)]">
          <CheckCircle2 size={16} className="shrink-0 text-[var(--primary)]" />
          عرض المسار على الخريطة
        </li>

        <li className="flex items-center gap-2 text-xs font-bold text-[var(--text)]">
          <CheckCircle2 size={16} className="shrink-0 text-[var(--primary)]" />
          وقت وصول تقديري ومحطات الطريق
        </li>
      </ul>

      <button
        type="button"
        onClick={() => navigate("/tracking")}
        className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-black text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--bg-hover)] hover:shadow-[var(--shadow)]"
      >
        جرّب تتبع رحلة
        <ArrowLeft size={17} />
      </button>

      <p className="mt-3 text-[10px] leading-5 text-[var(--muted)]">
        * الخريطة تعرض مسار الطريق التقديري وليست تتبعاً مباشراً لموقع الحافلة.
      </p>
    </div>
  );
}

export default TrackingPromoContent;
