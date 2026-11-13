import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";

import DestinationCard from "./DestinationCard";

const destinations = [
  {
    city: "دمشق",
    subtitle: "مدينة الياسمين",
  },
  {
    city: "حلب",
    subtitle: "عاصمة الشهباء",
  },
  {
    city: "اللاذقية",
    subtitle: "نسمة من البحر",
  },
  {
    city: "حمص",
    subtitle: "قلب سوريا",
  },
];

function DestinationsSection() {
  return (
    <section dir="rtl" className="bg-[var(--bg)] py-16 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        {/* Section Header */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-[var(--soft-teal)] px-3 py-1.5 text-xs font-bold text-[var(--primary)]">
              <Sparkles size={14} />
              اكتشف سوريا
            </span>

            <h2 className="text-2xl font-black text-[var(--text)] sm:text-3xl">
              على وين حاب تسافر؟
            </h2>

            <p className="mt-2 text-sm text-[var(--muted)]">
              وجهات مختلفة، ونفس الشعور الحلو لما تكون بالطريق.
            </p>
          </div>

          <Link
            to="/results"
            className="group inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)] transition-colors hover:text-[var(--primary-deep)]"
          >
            استكشف الرحلات
            <ArrowLeft
              size={17}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
          </Link>
        </div>

        {/* Destination Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-4">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.city}
              city={destination.city}
              subtitle={destination.subtitle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default DestinationsSection;
