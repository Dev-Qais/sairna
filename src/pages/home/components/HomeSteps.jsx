import { Search, BusFront, Ticket } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "اختار وجهتك",
    description: "حدد من وين لوين وتاريخ الرحلة المناسب إلك.",
    icon: Search,
    iconColor: "text-[var(--primary)]",
    iconBg: "bg-[var(--soft-teal)]",
  },
  {
    number: "02",
    title: "لاقي رحلتك",
    description: "قارن الشركات والمواعيد والأسعار واختار الأفضل.",
    icon: BusFront,
    iconColor: "text-[#F0A13B]",
    iconBg: "bg-[#FFF2DF]",
  },
  {
    number: "03",
    title: "احجز مقعدك",
    description: "اختار مقعدك وأكّد الحجز، وتذكرتك تصير جاهزة.",
    icon: Ticket,
    iconColor: "text-[#5689E8]",
    iconBg: "bg-[#E8F0FF]",
  },
];

function HomeSteps() {
  return (
    <section
      dir="rtl"
      className="bg-[var(--surface)] px-5 py-16 sm:px-8 sm:py-20"
    >
      <div className="mx-auto max-w-[1140px]">
        {/* Section Header */}
        <div className="mb-9 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--soft-teal)] px-4 py-1.5 text-xs font-bold text-[var(--primary)]">
            <span>✧</span>
            السفر صار أبسط
          </span>

          <h2 className="mt-3 text-2xl font-black text-[var(--text)] sm:text-3xl">
            3 خطوات...
            <span className="text-[var(--primary)]"> وتكون بالطريق</span>
          </h2>

          <p className="mt-2 text-xs text-[var(--muted)] sm:text-sm">
            ما في داعي للتعقيد، كل شي مرتب بواجهة وحدة.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="relative min-h-[190px] overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--surface-alt)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-[var(--shadow)]"
              >
                {/* Background Number */}
                <span
                  className="absolute left-5 top-3 text-5xl font-black leading-none text-[var(--muted)] opacity-20"
                  aria-hidden="true"
                >
                  {step.number}
                </span>

                {/* Icon */}
                <div
                  className={`relative grid h-14 w-14 place-items-center rounded-2xl ${step.iconBg} ${step.iconColor}`}
                >
                  <Icon size={26} strokeWidth={1.9} />
                </div>

                {/* Content */}
                <div className="relative mt-5">
                  <h3 className="text-base font-black text-[var(--text)]">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-[var(--muted)]">
                    {step.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HomeSteps;
