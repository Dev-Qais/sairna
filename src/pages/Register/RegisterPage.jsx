import { useState } from "react";
import image from "../../assets/image.jpg";
import SairnaIcon from "../../components/common/SairnaIcon";
import Button from "../../components/ui/Button";
import { useAuthStore } from "../../store/authStore";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiShield,
  FiCalendar,
} from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa6";
import { useRegister } from "../../hooks/auth/useRegister";

function RegisterPage() {
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const {
    mutate: register,
    isPending,
    isSuccess,
    isError,
    error,
  } = useRegister();

  const { setUser } = useAuthStore();

  function handleChange(event) {
    const { name, value } = event.target;

    setInputValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setUser(inputValues);
    register(inputValues);
  };

  const inputClass =
    "h-[58px] w-full rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] px-12 text-sm text-[var(--text)] placeholder:text-[var(--muted)] outline-none transition-all duration-300 focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10";

  return (
    <section className="container w-full bg-[var(--bg)] py-10 sm:py-8 lg:py-12 ">
      <div className="">
        <div className="mx-auto grid w-full  grid-cols-1 overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] max-sm:rounded-t-2xl sm:rounded-3xl md:grid-cols-2">
          {/*  قسم الفيجوال */}
          <div className="relative flex min-h-[250px] flex-col overflow-hidden bg-[linear-gradient(165deg,var(--dark)_0%,var(--primary-deep)_100%)] px-6 py-6 text-white sm:min-h-[340px] sm:px-8 sm:py-8 md:min-h-[650px] md:px-9 md:py-10 lg:min-h-[700px]">
            {/*   */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-[330px] w-[330px] rounded-full border border-white/15 md:-right-28 md:-top-28 md:h-[450px] md:w-[450px]" />

            {/* العنوان */}
            <div className="relative z-50 w-full">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3.5 py-2 text-[10px] font-bold sm:text-xs">
                <SairnaIcon />
                عالم جديد بانتظارك
              </span>

              <h2 className="mt-4 text-[25px] z-[100] font-extrabold leading-[1.5] sm:mt-6 sm:text-[32px] md:text-[34px] lg:text-[40px]">
                كل الطرق
                <br />
                بتوصّل لذكريات.
              </h2>

              <p className="mt-1 text-[10px] text-white/75 sm:text-xs">
                ومن أول محطة رح نكون معك.
              </p>
            </div>

            {/*  صورة الفيجوال  */}
            <div className="absolute bottom-4 left-4 z-10 h-[120px] w-[52%] sm:bottom-6 sm:left-6 sm:h-[155px] md:relative md:bottom-auto md:left-auto md:mt-8 md:h-auto md:w-full md:flex-1">
              <img
                src={image}
                alt="معالم دمشق"
                className="h-full w-full rounded-2xl object-cover object-center shadow-2xl -rotate-[4deg] md:aspect-[1.45] md:max-h-[310px]"
              />
            </div>

            <div className="relative z-10 mt-auto items-center justify-start gap-3 pt-8 text-xs font-bold flex">
              <span className="flex items-center gap-2">
                <FiShield size={19} />
                سهل وواضح
              </span>

              <span className="flex items-center gap-2">
                <FiCalendar size={19} />
                حجز بخطوات بسيطة
              </span>
            </div>
          </div>

          {/*  الكونتنت */}
          <div className="flex flex-col justify-center px-5 py-8 sm:px-9 sm:py-10 md:px-8 lg:px-12 xl:px-[74px]">
            <div className="mb-7">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--soft-teal)] px-3.5 py-2 text-[10px] font-bold text-[var(--primary)] sm:text-xs">
                <SairnaIcon />
                انضم لعائلة سيرنا
              </span>

              <h1 className="mt-4 text-[25px] font-extrabold leading-[1.5] tracking-tight text-[var(--text)] sm:mt-5 sm:text-[30px] lg:text-[32px]">
                خلّينا نبدأ{" "}
                <span className="text-[var(--primary)]">المشوار سوا.</span>
              </h1>

              <p className="mt-2 text-[11px] leading-6 text-[var(--muted)] sm:text-xs">
                حساب بسيط، ورحلاتك كلها بين إيديك.
              </p>
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="fullName"
                  className="text-xs font-bold text-[var(--text)]"
                >
                  الاسم الكامل
                </label>

                <div className="relative">
                  <FiUser
                    size={19}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                  />

                  <input
                    id="fullName"
                    name="name"
                    type="text"
                    placeholder="اسمك الكامل"
                    className={inputClass}
                    value={inputValues.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-xs font-bold text-[var(--text)]"
                >
                  البريد الإلكتروني
                </label>

                <div className="relative">
                  <FiMail
                    size={19}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    dir="ltr"
                    placeholder="name@example.com"
                    className={`${inputClass} text-left`}
                    value={inputValues.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-xs font-bold text-[var(--text)]"
                >
                  كلمة المرور
                </label>

                <div className="relative">
                  <FiLock
                    size={19}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                  />

                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="أحرف على الأقل 8"
                    dir="ltr"
                    className={`${inputClass} text-left`}
                    value={inputValues.password}
                    onChange={handleChange}
                  />

                  <FiEye
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer text-[var(--muted)]"
                  />
                </div>
              </div>

              {/* Terms */}
              <label className="flex cursor-pointer items-start gap-2 text-[10px] leading-6 text-[var(--muted)] sm:text-xs">
                <input
                  type="checkbox"
                  className="mt-1 h-3.5 w-3.5 shrink-0 accent-[var(--primary)]"
                />
                <span>
                  أوافق على استخدام بيانات تجريبية في هذا النموذج التعليمي.
                </span>
              </label>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
              >
                <span className="flex items-center justify-center gap-3">
                  إنشاء حساب
                  <FaArrowLeft size={17} />
                </span>
              </Button>
            </form>

            {/* Login Link */}
            <p className="mt-6 text-center text-[11px] text-[var(--muted)] sm:text-xs">
              عندك حساب من قبل؟{" "}
              <Button
                to="/login"
                variant="transparent"
                size="sm"
                className="inline-flex !h-auto !min-h-0 !p-0 font-bold text-[var(--primary)]"
              >
                سجّل دخولك
              </Button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
