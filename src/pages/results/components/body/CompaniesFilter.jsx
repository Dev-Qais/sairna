import { ArrowLeft, Bus, Star, CheckCircle2 } from "lucide-react";

function CompanyLogo({ company }) {
  const fallbackLetter = company.name?.trim()?.charAt(0) || "";

  return (
    <div className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-[var(--soft-teal)] text-xl font-black text-[var(--primary)]">
      {fallbackLetter || <Bus size={25} />}

      {company.logoUrl && (
        <img
          src={company.logoUrl}
          alt={company.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full bg-[var(--surface)] object-contain p-2"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      )}
    </div>
  );
}

function CompaniesFilter({ companies = [], selectedCompany, onSelectCompany }) {
  return (
    <section dir="rtl">
      <div className="mt-8">
        {/* Section Header */}
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-[36px] w-[36px] shrink-0 place-items-center rounded-[12px] bg-[var(--soft-teal)] text-[14px] font-black text-[var(--primary)]">
              01
            </span>

            <div>
              <h3 className="text-lg font-black text-[var(--text)]">
                اختيار شركة النقل
              </h3>

              <p className="m-0 text-xs text-[var(--muted)]">
                حدد الشركة اللي بتفضّلها، ومنعرضلك مواعيدها المتاحة.
              </p>
            </div>
          </div>

          <span className="hidden items-center gap-2 text-xs font-extrabold text-[var(--muted)] sm:flex">
            02 <ArrowLeft size={15} /> اختيار الوقت والمقعد
          </span>
        </div>

        {/* Companies Grid */}
        {companies.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {/* All Companies */}
            <button
              type="button"
              onClick={() => onSelectCompany("all")}
              aria-pressed={selectedCompany === "all"}
              className={`
                flex min-w-0 cursor-pointer flex-col items-center justify-center gap-2
                rounded-[13px] border px-3 py-5
                transition-all duration-200
                ${
                  selectedCompany === "all"
                    ? "border-[var(--primary)] bg-[var(--soft-teal)]"
                    : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]"
                }
              `}
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[var(--soft-teal)]">
                <Bus size={27} className="text-[var(--primary)]" />
              </span>

              <h4 className="text-center text-sm font-black text-[var(--text)]">
                كل الشركات
              </h4>

              <p className="m-0 text-xs text-[var(--muted)]">قارن الخيارات</p>
            </button>

            {/* Dynamic Companies */}
            {companies.map((company) => {
              const isSelected = String(selectedCompany) === String(company.id);

              return (
                <button
                  key={company.id}
                  type="button"
                  onClick={() => onSelectCompany(company.id)}
                  aria-pressed={isSelected}
                  className={`
                    flex min-w-0 cursor-pointer flex-col items-center gap-2
                    rounded-[13px] border px-3 py-5
                    transition-all duration-200
                    ${
                      isSelected
                        ? "border-[var(--primary)] bg-[var(--soft-teal)]"
                        : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]"
                    }
                  `}
                >
                  {/* Logo */}
                  {company.logoUrl ? (
                    <CompanyLogo company={company} />
                  ) : (
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[var(--soft-teal)]">
                      <span size={27} className="text-[var(--primary)]">
                        {company.name?.trim()?.charAt(2) || ""}
                      </span>
                    </span>
                  )}

                  {/* Company Name */}
                  <h4 className="line-clamp-2 min-h-[42px] w-full break-words text-center text-sm font-black leading-6 text-[var(--text)]">
                    {company.name}
                  </h4>

                  {/* Company Status */}
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--muted)]">
                    <CheckCircle2
                      size={13}
                      className={
                        company.isActive
                          ? "text-[var(--primary)]"
                          : "text-[var(--muted)]"
                      }
                    />

                    {company.isActive ? "شركة نشطة" : "غير نشطة"}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center text-sm text-[var(--muted)]">
            لا توجد شركات نقل متاحة.
          </div>
        )}
      </div>
    </section>
  );
}

export default CompaniesFilter;
