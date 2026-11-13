import { useNavigate } from "react-router-dom";
import { BusFront, ArrowLeft, CheckCircle2, Building2 } from "lucide-react";

function CompanyCard({ company }) {
  const navigate = useNavigate();

  if (!company) return null;

  const handleViewTrips = () => {
    navigate(`/results?companyId=${company.id}`);
  };

  return (
    <article
      dir="rtl"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
    >
      {/* Company Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-alt)]">
          {company.logoUrl ? (
            <img
              src={company.logoUrl}
              alt={company.name}
              className="h-full w-full object-contain p-2"
              loading="lazy"
            />
          ) : (
            <BusFront size={30} className="text-[var(--primary)]" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-black leading-7 text-[var(--text)]">
            {company.name}
          </h3>

          <div className="mt-1 flex items-center gap-1.5">
            <span
              className={`h-2 w-2 rounded-full ${
                company.isActive ? "bg-[var(--primary)]" : "bg-[var(--muted)]"
              }`}
            />

            <span className="text-[10px] font-bold text-[var(--muted)]">
              {company.isActive ? "شركة نشطة" : "غير نشطة"}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="mt-5 min-h-[48px] text-xs leading-6 text-[var(--muted)]">
        {company.description ||
          "اكتشف الرحلات المتاحة مع هذه الشركة واختر وجهتك القادمة بكل سهولة."}
      </p>

      {/* Company Information */}
      <div className="my-5 flex items-center gap-2 rounded-xl bg-[var(--surface-alt)] px-3 py-3">
        <Building2 size={16} className="shrink-0 text-[var(--primary)]" />

        <span className="text-[11px] font-bold text-[var(--text)]">
          خدمات النقل والسفر
        </span>

        {company.isActive && (
          <CheckCircle2 size={15} className="mr-auto text-[var(--primary)]" />
        )}
      </div>

      {/* Action */}
      <button
        type="button"
        disabled={!company.isActive}
        onClick={handleViewTrips}
        className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-3 text-xs font-bold text-white transition hover:bg-[var(--bg-hover)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        عرض رحلات الشركة
        <ArrowLeft size={15} />
      </button>
    </article>
  );
}

export default CompanyCard;
