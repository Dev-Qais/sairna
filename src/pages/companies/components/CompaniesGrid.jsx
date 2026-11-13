import { RefreshCw, Building2 } from "lucide-react";
import CompanyCard from "./CompanyCard";

function CompaniesGrid({ companies = [], isLoading, isError, refetch }) {
  if (isLoading) {
    return (
      <section
        dir="rtl"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-[310px] animate-pulse rounded-2xl border border-[var(--border)] bg-[var(--surface-alt)]"
          />
        ))}
      </section>
    );
  }

  if (isError) {
    return (
      <div
        dir="rtl"
        className="flex flex-col items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-12 text-center"
      >
        <RefreshCw size={30} className="text-[var(--muted)]" />

        <h3 className="mt-4 font-black text-[var(--text)]">
          تعذر تحميل شركات النقل
        </h3>

        <p className="mt-2 text-xs text-[var(--muted)]">
          حدث خطأ أثناء جلب البيانات، يرجى المحاولة مرة أخرى.
        </p>

        <button
          type="button"
          onClick={() => refetch?.()}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[var(--bg-hover)]"
        >
          <RefreshCw size={14} />
          إعادة المحاولة
        </button>
      </div>
    );
  }

  if (!companies.length) {
    return (
      <div
        dir="rtl"
        className="flex flex-col items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-14 text-center"
      >
        <Building2 size={34} className="text-[var(--muted)]" />

        <h3 className="mt-4 font-black text-[var(--text)]">
          لا توجد شركات نقل حالياً
        </h3>

        <p className="mt-2 text-xs text-[var(--muted)]">
          لم يتم العثور على شركات متاحة في الوقت الحالي.
        </p>
      </div>
    );
  }

  return (
    <section
      dir="rtl"
      className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </section>
  );
}

export default CompaniesGrid;
