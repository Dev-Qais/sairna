import CompaniesHero from "./components/CompaniesHero";
import CompaniesGrid from "./components/CompaniesGrid";
import { useCompanies } from "../../hooks/companies/useCompanies";

function CompaniesPage() {
  const { data: companies = [], isLoading, isError, refetch } = useCompanies();

  return (
    <main
      dir="rtl"
      className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="space-y-10">
        {/* Hero Section */}
        <CompaniesHero />

        {/* Companies Section */}
        <section>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-[var(--text)]">
                شركاؤنا في الطريق
              </h2>

              <p className="mt-1 text-xs text-[var(--muted)]">
                تعرّف على شركات النقل المتاحة واختر وجهتك القادمة.
              </p>
            </div>

            {!isLoading && !isError && (
              <span className="rounded-full bg-[var(--soft-teal)] px-4 py-2 text-xs font-bold text-[var(--primary)]">
                {companies.length} شركات
              </span>
            )}
          </div>

          <CompaniesGrid
            companies={companies}
            isLoading={isLoading}
            isError={isError}
            refetch={refetch}
          />
        </section>

        {/* Footer Note */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-alt)] px-5 py-4 text-center">
          <p className="text-xs leading-6 text-[var(--muted)]">
            نعمل باستمرار على توسيع شبكة شركائنا لنمنحك خيارات أكثر وراحة أكبر
            في رحلاتك.
          </p>
        </div>
      </div>
    </main>
  );
}

export default CompaniesPage;
