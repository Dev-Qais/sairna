import HomeTrackingMap from "./HomeTrackingMap";
import TrackingPromoContent from "./TrackingPromoContent";

function HomeTrackingSection() {
  return (
    <section className="bg-[var(--bg)] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-[1140px] overflow-hidden rounded-[26px] border border-[var(--border)] lg:grid-cols-2">
        {/* Content - Right Side */}
        <div className="min-w-0">
          <TrackingPromoContent />
        </div>
        {/* Map - Left Side */}
        <div className="min-w-0">
          <HomeTrackingMap />
        </div>
      </div>
    </section>
  );
}

export default HomeTrackingSection;
