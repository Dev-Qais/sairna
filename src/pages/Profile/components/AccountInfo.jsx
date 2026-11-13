import { useAuthStore } from "../../../store/authStore";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FaCalendarCheck, FaArrowLeft } from "react-icons/fa6";
import Button from "../../../components/ui/Button";
function AccountInfo() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  return (
    <section className="container py-[86px] px-0">
      <div
        className="
            grid
            grid-cols-1 lg:grid-cols-[300px_1fr]
            gap-[20px]
            "
      >
        <div
          className="
            text-center
            bg-[var(--surface)]
            border
            border-[var(--border)]
            rounded-[19px]
            p-7"
        >
          <div
            className="
                w-[90px]
                h-[90px]
                rounded-[30px]
                bg-[var(--soft-teal)]
                text-[var(--primary)]
                grid
                place-items-center
                text-[43px]
                font-black
                mt-[3px]
                mx-auto
                mb-[13px]
                "
          >
            {user?.name?.charAt(0) || "U"}
          </div>
          <h2
            className="
                text-[20px]
                m-0
                leading-[1.5]
                font-extrabold
                "
          >
            {user?.name || "User"}
          </h2>
          <span
            className="
                text-[16px]
                m-0
                leading-[1.5]
                font-normal
                "
          >
            {user?.email || "user@example.com"}
          </span>
          <div
            className="
                flex
                items-center
                justify-center
                gap-[7px]
                bg-[var(--surface-alt)]
                p-[13px]
                rounded-[11px]
                my-[22px]
                text-[12px]
                "
          >
            <FaCalendarCheck />0 حجوزات محفوظة
          </div>
          <button
            onClick={logout}
            className="
                inline-flex
                items-center
                justify-center
                gap-[10px]
                border
                border-[var(--border)]
                rounded-[12px]
                min-h-[49px]
                py-[11px]
                px-[22px]
                font-extrabold
                text-[13px]
                whitespace-nowrap
                transition-[transform,box-shadow,background,border]
                duration-[250ms]
                ease-in-out
                text-[var(--text)]
                bg-[var(--surface)]
                cursor-pointer
                hover:bg-[var(--primary)]
                hover:text-[var(--primary-deep)]
                "
          >
            <FaArrowRightFromBracket />
            تسجيل الخروج
          </button>
        </div>
        <div
          className="
            bg-[var(--surface)]
            border
            border-[var(--border)]
            rounded-[19px]
            p-[27px]
            "
        >
          <h2
            className="
                text-[20px]
                border-b
                border-[var(--border)]
                pb-[17px]
                "
          >
            معلومات الحساب
          </h2>

          <div
            className="
                flex
                items-center
                justify-between
                gap-[13px]
                py-[18px]
                border-b
                border-[var(--border)]
                text-[12px]
                "
          >
            <span className="text-[var(--muted)]">الاسم الكامل</span>

            <b>{user.name || "User"}</b>
          </div>
          <div
            className="
                flex
                items-center
                justify-between
                gap-[13px]
                py-[18px]
                border-b
                border-[var(--border)]
                text-[12px]
                "
          >
            <span className="text-[var(--muted)]">البريد الإلكتروني</span>
            <b>{user.email || "user@example.com"}</b>
          </div>
          <div
            className="
                flex
                items-center
                justify-between
                gap-[13px]
                py-[18px]
                border-b
                border-[var(--border)]
                text-[12px]
                "
          >
            <span className="text-[var(--muted)]">نوع الحساب</span>
            <b>{user.role || "User"}</b>
          </div>
          <Button
            to="/trips"
            variant="primary"
            size="lg"
            className="shadow-[0_9px_20px_rgba(8,165,151,0.19)] mt-6 flex shrink-0 w-fit items-center"
          >
            انتقل لحجوزاتي
            <FaArrowLeft className="inline-block mr-1.5" size={14} />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default AccountInfo;
