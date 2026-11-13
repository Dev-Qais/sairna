import { Bus } from "lucide-react";
import Eyebrow from "../../../components/ui/Eyebrow";

function ResultsHeading() {
  return (
    <section
      className="
        relative
        bg-[linear-gradient(140deg,var(--surface-alt),var(--bg))]
        border-b
        border-[var(--border)]
        pt-[26px]
        pb-[45px]
        relative
        overflow-hidden
        after:content-['']
        after:absolute
        after:w-[350px]
        after:h-[350px]
        after:border
        after:border-dashed
        after:border-[rgba(25,167,154,0.1)]
        after:rounded-full
        after:left-[-120px]
        after:top-[-180px]
        after:pointer-events-none
        "
    >
      <div className="container">
        <div
          className="
            flex
            items-center
            justify-between
            gap-[25px]
"
        >
          <div>
            <Eyebrow>لنكمل الطريق</Eyebrow>
            <h1 className="text-4xl mt-3 mx-0 mb-1.5 font-black text-[var(--text)]">
              اختار الرحلة{" "}
              <span className="text-[var(--primary)]">اللي بتشبهك.</span>
            </h1>
            <p className="text-[var(--muted)] text-xs font-medium m-0">
              اختر الرحلة المناسبة لك من بين الخيارات المتاحة.
            </p>
          </div>
          <div
            className="
            text-[var(--primary)]
            opacity-[0.35]
            rotate-[-7deg]
            "
          >
            <Bus size={70} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResultsHeading;
