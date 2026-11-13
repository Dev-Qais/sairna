import { ArrowLeft, Sparkles, Navigation } from "lucide-react";

import { useNavigate } from "react-router-dom";

function TrackingHeader() {
  const navigate = useNavigate();

  return (
    <header
      dir="rtl"
      className="flex w-full flex-col items-start justify-between gap-5 sm:flex-row sm:items-end"
    >
      {/* Title Section */}
      <div className="min-w-0 flex-1">
        {/* Small Label */}
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[var(--soft-teal)] px-3 py-1.5 text-[10px] font-bold text-[var(--primary)]">
          <Sparkles size={13} />
          تتبع الطريق
        </div>

        {/* Title and Badge */}
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-black leading-tight text-[var(--text)] sm:text-3xl">
            رحلتك قدام عيونك
          </h1>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-[10px] font-bold text-[var(--primary)]">
            <Navigation size={13} />
            محاكاة تفاعلية
          </span>
        </div>

        {/* Description */}
        <p className="mt-3 text-xs leading-6 text-[var(--muted)]">
          خط السير على الخريطة مع محطات ووقت وصول توضيحي.
        </p>
      </div>

      {/* Back to Bookings */}
      <button
        type="button"
        onClick={() => navigate("/trips")}
        className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] px-5 py-3 text-xs font-bold text-[var(--text)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
      >
        كل الحجوزات
        <ArrowLeft size={16} />
      </button>
    </header>
  );
}

export default TrackingHeader;
