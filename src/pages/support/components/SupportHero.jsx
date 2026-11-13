import { Sparkles } from "lucide-react";

function SupportHero() {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--surface)] px-5 py-12 sm:px-8 sm:py-16"
    >
      <div className="relative mx-auto max-w-[1056px]">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--soft-teal)] px-4 py-2 text-xs font-bold text-[var(--primary)]">
          <Sparkles size={14} />
          نحن معك
        </div>

        <h1 className="mt-5 text-3xl font-black leading-relaxed text-[var(--text)] sm:text-4xl lg:text-5xl">
          شو حابب <span className="text-[var(--primary)]">تعرف؟</span>
        </h1>

        <p className="mt-3 text-xs leading-7 text-[var(--muted)] sm:text-sm">
          أسئلة تساعدك تستخدم نموذج سيرنا بسهولة.
        </p>
      </div>
    </section>
  );
}

export default SupportHero;
