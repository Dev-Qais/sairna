import SupportHero from "./components/SupportHero";
import SupportFAQ from "./components/SupportFAQ";
import SupportContact from "./components/SupportContact";

function SupportPage() {
  return (
    <main className="min-h-[60vh] w-full bg-[var(--bg)]">
      <SupportHero />

      <section
        dir="rtl"
        className="mx-auto grid w-full max-w-[1056px] grid-cols-1 items-start gap-6 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-5 lg:py-14"
      >
        {/* FAQ - Right Side */}
        <div className="order-1 min-w-0">
          <SupportFAQ />
        </div>

        {/* Contact - Left Side */}
        <div className="order-2 lg:order-1">
          <SupportContact />
        </div>
      </section>
    </main>
  );
}

export default SupportPage;
