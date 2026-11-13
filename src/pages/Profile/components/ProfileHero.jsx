import SairnaIcon from "../../../components/common/SairnaIcon";
import Eyebrow from "../../../components/ui/Eyebrow";
import { useAuthStore } from "../../../store/authStore";
import { FaHand } from "react-icons/fa6";

function ProfileHero() {
  const user = useAuthStore((state) => state.user);
  return (
    <section
      className="
        bg-[linear-gradient(140deg,var(--surface-alt),var(--bg))]
        border-b
        border-[var(--border)]
        pt-[26px]
        pb-[45px]
        relative
        overflow-hidden
        "
    >
      <div
        className="
        relative
        container
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
        <span>
          <Eyebrow> ملفك الشخصي</Eyebrow>
        </span>

        <h1
          className="
            text-[clamp(29px,3.2vw,42px)]
            mt-[11px]
            mb-[6px]
            "
        >
          اهلا بك，
          {user?.email || "الاسم"}
          <span>
            <FaHand className="inline-block ml-[6px] text-[var(--primary)]" />
          </span>
        </h1>
        <p className="text-xs m-0 text-[var(--muted)]">
          هون كل التفاصيل المتعلقة بحسابك
        </p>
      </div>
    </section>
  );
}

export default ProfileHero;
