import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Ticket } from "lucide-react";

import TrackingHeader from "./components/TrackingHeader";
import TripMap from "./components/TripMap";
import TripSidebar from "./components/TripSidebar";

function TrackingPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;

  if (!booking?.trip) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center">
        <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white px-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0DAB9E]/10 text-[#0DAB9E]">
            <Ticket size={30} />
          </div>

          <h1 className="mt-5 text-xl font-black text-slate-800">
            لا توجد بيانات للرحلة
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            يرجى العودة إلى حجوزاتك واختيار الرحلة التي تريد عرض تفاصيلها.
          </p>

          <button
            type="button"
            onClick={() => navigate("/trips")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0DAB9E] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#09998E]"
          >
            <ArrowRight size={16} />
            العودة إلى حجوزاتي
          </button>
        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8"
    >
      <div className="space-y-6">
        <TrackingHeader />

        {/* LTR هنا فقط لضبط مواضع أعمدة Grid فعلياً */}
        <div
          dir="ltr"
          className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_380px]"
        >
          {/* Map - Left */}
          <section className="min-w-0 w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)]">
            <TripMap trip={booking.trip} />
          </section>

          {/* Sidebar - Right */}
          <section dir="rtl" className="h-fit min-w-0 w-full self-start">
            <TripSidebar booking={booking} />
          </section>
        </div>
      </div>
    </main>
  );
}

export default TrackingPage;
