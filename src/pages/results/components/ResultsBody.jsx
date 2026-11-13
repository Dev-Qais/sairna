import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import SearchBox from "../../home/components/SearchBox";

import { useCompanies } from "../../../hooks/companies/useCompanies";
import useTrips from "../../../hooks/trips/useTrips";
import useSearchStore from "../../../store/useSearchStore";

import CompaniesFilter from "../components/body/CompaniesFilter";
import ResultsToolbar from "../components/body/ResultsToolbar";
import ResultsSidebar from "./body/ResultsSidebar";
import TripCard from "./body/TripCard";

function ResultsBody({ onSelectTrip }) {
  // Search URL parameters
  const [searchParams, setSearchParams] = useSearchParams();

  // Search data
  const searchData = useSearchStore((state) => state.searchData);

  // Selected company from URL
  const selectedCompany = searchParams.get("companyId") || "all";

  // Sorting
  const [sortBy, setSortBy] = useState("earliest");
  const [departurePeriod, setDeparturePeriod] = useState("all");

  // Update selected company in URL
  const handleSelectCompany = (companyId) => {
    setSearchParams((previousParams) => {
      const nextParams = new URLSearchParams(previousParams);

      if (companyId === "all") {
        nextParams.delete("companyId");
      } else {
        nextParams.set("companyId", companyId);
      }

      return nextParams;
    });
  };

  // Companies
  const {
    data: companies = [],
    isPending: companiesLoading,
    isError: companiesError,
  } = useCompanies();

  // Remove any previous companyId from search data
  const { companyId: ignoredCompanyId, ...baseSearchData } = searchData || {};

  // Trips filters
  const tripsFilters = {
    ...baseSearchData,
    ...(selectedCompany !== "all" && {
      companyId: selectedCompany,
    }),
  };

  // Trips
  const {
    data: trips = [],
    isLoading: tripsLoading,
    isError: tripsError,
    error,
  } = useTrips(tripsFilters);

  const { data: allTrips = [], isLoading: allTripsLoading } = useTrips({});

  // Selected company details
  const selectedCompanyData = companies.find(
    (company) => String(company.id) === String(selectedCompany),
  );

  // Damascus timezone
  const getDamascusHour = (departureAt) => {
    return Number(
      new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        hourCycle: "h23",
        timeZone: "Asia/Damascus",
      }).format(new Date(departureAt)),
    );
  };

  // Departure period filtering
  const filteredTrips = trips.filter((trip) => {
    if (departurePeriod === "all") return true;

    const hour = getDamascusHour(trip.departureAt);

    if (departurePeriod === "morning") return hour < 12;

    if (departurePeriod === "afternoon") {
      return hour >= 12 && hour < 17;
    }

    if (departurePeriod === "evening") return hour >= 17;

    return true;
  });

  // Sort trips
  const sortedTrips = [...filteredTrips].sort((a, b) => {
    if (sortBy === "cheap") {
      return a.price - b.price;
    }

    if (sortBy === "quick") {
      const durationA = new Date(a.arrivalAt) - new Date(a.departureAt);

      const durationB = new Date(b.arrivalAt) - new Date(b.departureAt);

      return durationA - durationB;
    }

    return new Date(a.departureAt) - new Date(b.departureAt);
  });

  // Reset filters
  const handleResetFilters = () => {
    handleSelectCompany("all");
    setDeparturePeriod("all");
  };

  return (
    <section className="container pb-24">
      {/* Search */}
      <div className="-mt-6 flex items-center justify-center">
        <SearchBox showHeader={false} />
      </div>

      {/* Companies Filter */}
      {companiesLoading ? (
        <p className="mt-8 text-sm text-[var(--muted)]">
          جاري تحميل شركات النقل...
        </p>
      ) : companiesError ? (
        <p className="mt-8 text-sm text-[var(--muted)]">
          حدث خطأ أثناء تحميل شركات النقل.
        </p>
      ) : (
        <CompaniesFilter
          companies={companies}
          selectedCompany={selectedCompany}
          onSelectCompany={handleSelectCompany}
        />
      )}

      {/* Selected Company */}
      {selectedCompany !== "all" && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] px-4 py-3">
          <div>
            <p className="text-[10px] font-medium text-[var(--muted)]">
              أنت تستعرض رحلات شركة
            </p>

            <h2 className="mt-1 text-sm font-black text-[var(--text)]">
              {selectedCompanyData?.name || "شركة النقل"}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => handleSelectCompany("all")}
            className="text-xs font-bold text-[var(--primary)] transition hover:text-[var(--primary-deep)]"
          >
            عرض جميع الشركات
          </button>
        </div>
      )}

      {/* Results Toolbar */}
      <ResultsToolbar
        tripsCount={sortedTrips.length}
        searchData={searchData}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="mt-5 flex flex-col gap-6 lg:flex-row">
        {/* Sidebar */}
        <ResultsSidebar
          companies={companies}
          allTrips={allTrips}
          selectedCompany={selectedCompany}
          onSelectCompany={handleSelectCompany}
          departurePeriod={departurePeriod}
          onSelectDeparturePeriod={setDeparturePeriod}
          onResetFilters={handleResetFilters}
        />

        {/* Trips */}
        <div className="min-w-0 flex-1">
          {tripsLoading || allTripsLoading ? (
            <p className="py-10 text-center text-sm text-[var(--muted)]">
              جاري تحميل الرحلات...
            </p>
          ) : tripsError ? (
            <p className="py-10 text-center text-sm text-red-500">
              {error?.message || "حدث خطأ أثناء تحميل الرحلات."}
            </p>
          ) : sortedTrips.length > 0 ? (
            <div className="space-y-5">
              {sortedTrips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onSelectTrip={onSelectTrip}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-12 text-center">
              <h3 className="font-black text-[var(--text)]">
                لا توجد رحلات متاحة
              </h3>

              <p className="mt-2 text-xs text-[var(--muted)]">
                {selectedCompany !== "all"
                  ? "لا توجد رحلات متاحة لهذه الشركة وفق خيارات البحث الحالية."
                  : "جرّب تغيير خيارات البحث والفلاتر."}
              </p>

              {selectedCompany !== "all" && (
                <button
                  type="button"
                  onClick={() => handleSelectCompany("all")}
                  className="mt-4 text-xs font-bold text-[var(--primary)]"
                >
                  عرض رحلات جميع الشركات
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ResultsBody;
