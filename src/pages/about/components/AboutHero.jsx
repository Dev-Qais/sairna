import { Sparkles } from "lucide-react";

function AboutHero() {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--surface)] px-5 py-12 sm:px-8 sm:py-16"
    >
      <div className="relative mx-auto max-w-[1056px]">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--soft-teal)] px-4 py-2 text-xs font-bold text-[var(--primary)]">
          <Sparkles size={14} />
          قصتنا
        </div>

        <h1 className="mt-5 text-3xl font-black leading-relaxed text-[var(--text)] sm:text-4xl lg:text-5xl">
          سيرنا.
          <span className="text-[var(--primary)]"> رحلة أبسط لكل حدا.</span>
        </h1>

        <p className="mt-3 max-w-2xl text-xs leading-7 text-[var(--muted)] sm:text-sm">
          فكرة موقع لحجز الرحلات البرية بين المحافظات السورية، أنتجت كنموذج
          تعليمي لتصميم وتطوير الويب.
        </p>
      </div>
    </section>
  );
}

export default AboutHero;
