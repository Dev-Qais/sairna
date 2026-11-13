import useCities from "../../../hooks/cities/useCities";
import { useCompanies } from "../../../hooks/companies/useCompanies";
import useTrips from "../../../hooks/trips/useTrips";

function HomeStats() {
  const { data: cities = [], isPending: citiesLoading } = useCities();

  const { data: companies = [], isPending: companiesLoading } = useCompanies();

  const { data: trips = [], isPending: tripsLoading } = useTrips({});

  // Active companies count
  const activeCompanies = companies.filter((company) => company).length;

  // Today's trips count (Asia/Damascus)
  const getDamascusDate = (date) => {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Damascus",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(date));
  };

  const today = getDamascusDate(new Date());

  const todayTrips = trips.filter(
    (trip) => getDamascusDate(trip.departureAt) === today,
  ).length;

  const stats = [
    {
      value: cities.length,
      label: "محافظة سورية",
      isLoading: citiesLoading,
    },
    {
      value: activeCompanies,
      label: "شركات نقل نشطة",
      isLoading: companiesLoading,
    },
    {
      value: todayTrips,
      label: "رحلة متاحة اليوم",
      isLoading: tripsLoading,
    },
    {
      value: "24/7",
      label: "سهولة الوصول للموقع",
      isLoading: false,
    },
  ];

  return (
    <section
      dir="rtl"
      className="border-y border-[var(--border)] bg-[var(--surface)]"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-y-6 px-5 py-7 sm:grid-cols-4 sm:gap-y-0 sm:px-8">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`
              flex flex-col items-center justify-center text-center
              ${index !== 0 ? "sm:border-r sm:border-[var(--border)]" : ""}
            `}
          >
            <span className="text-2xl font-black tabular-nums text-[var(--text)] sm:text-3xl">
              {stat.isLoading ? (
                <span className="inline-block h-8 w-12 animate-pulse rounded-md bg-[var(--surface-alt)]" />
              ) : (
                stat.value
              )}
            </span>

            <span className="mt-1 text-[10px] font-bold text-[var(--muted)] sm:text-xs">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomeStats;
