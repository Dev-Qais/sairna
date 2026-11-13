import { ArrowLeft, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CompaniesHero() {
  const navigate = useNavigate();

  return (
    <section
      dir="rtl"
      className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-5 py-12 text-center shadow-[var(--shadow)] sm:px-10 sm:py-16"
    >
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[var(--soft-teal)] opacity-60 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-[var(--soft-teal)] opacity-50 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-alt)] px-4 py-2 text-xs font-bold text-[var(--primary)]">
          <Building2 size={15} />
          شركاء الطريق
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-black leading-[1.6] text-[var(--text)] sm:text-4xl lg:text-5xl">
          شركات بتوصلك{" "}
          <span className="text-[var(--primary)]">لوين ما بدك</span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-[var(--muted)] sm:text-base">
          اكتشف أفضل شركات النقل والسياحة في سوريا، واختر الشركة المناسبة لرحلتك
          بكل سهولة وراحة.
        </p>

        {/* Action */}
        <button
          type="button"
          onClick={() => navigate("/results")}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-7 py-3.5 text-sm font-bold text-white shadow-[var(--shadow)] transition hover:bg-[var(--bg-hover)]"
        >
          استكشف الرحلات
          <ArrowLeft size={17} />
        </button>
      </div>
    </section>
  );
}

export default CompaniesHero;
