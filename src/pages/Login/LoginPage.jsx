import { useState } from "react";
import SairnaIcon from "../../components/common/SairnaIcon";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCalendar,
  FiShield,
} from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import image from "../../assets/image.jpg";
import useLogin from "../../hooks/auth/useLogin";
import loginValidation from "../../utils/validation/loginValidation";
import { useToast } from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import Message from "../../components/ui/Message";
import { useAuthStore } from "../../store/authStore";
function LoginPage() {
  const [inputForm, setInputForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const { mutate: login, isPending } = useLogin();
  const { setAuth } = useAuthStore();

  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = loginValidation(inputForm);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      login(inputForm, {
        onSuccess: (data) => {
          setAuth({
            user: data.user,
            accessToken: data.accessToken,
            tokenType: data.tokenType,
          });

          toast.success("تم تسجيل الدخول بنجاح");
          navigate("/profile");
        },
        onError: (error) => {
          const status = error?.response?.status;
          if (status === 401) {
            toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
          } else if (!error?.response) {
            toast.error("تعذر الاتصال بالخادم. تحقق من اتصالك بالإنترنت.");
          } else {
            toast.error("حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.");
          }
        },
      });
    }
  };

  function handleInputChange(e) {
    const { name, value } = e.target;
    setInputForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  }

  return (
    <section
      className="container mx-auto bg-[var(--bg)] px-4 pt-8 pb-12
        sm:px-6 sm:pt-10 sm:pb-16
        lg:pt-14 lg:pb-20"
    >
      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        bg-[var(--surface)]
        border
        border-[var(--border)]
        rounded-[25px]
        min-h-0
        md:min-h-[510px]
        overflow-hidden
       direction:ltr
        shadow-[var(--shadow)]"
      >
        <div
          className="
            flex
            flex-col
            justify-center
            min-w-0
            order-2 md:order-1
            py-8
            px-5
            sm:py-10
            sm:px-8
            lg:py-[49px]
            lg:px-[min(6vw,80px)]
            "
        >
          <div className="">
            <span
              className="
                inline-flex
                items-center
                gap-[8px]
                bg-[var(--soft-teal)]
                text-[var(--primary-deep)]
                rounded-[99px]
                py-[5px]
                px-[14px]
                text-[11px]
                font-black
                tracking-[0.12px]
            
                "
            >
              <SairnaIcon />
              أهلاً برجعتك
            </span>
            <h1
              className="
                text-[25px]
                sm:text-[28px]
                lg:text-[30px]
                mt-3
                mb-[5px]
                tracking-[-0.7px]
                leading-snug
                "
            >
              منوّر,
              <span className="text-[var(--primary)]">اشتقنالك!</span>
            </h1>
            <p
              className="
                text-[var(--muted)]
                text-xs
                sm:text-[13px]
                "
            >
              ادخل على حسابك، وكمّل حجز رحلتك براحة.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            action=""
            className="
                flex
                flex-col
                gap-[17px]
                my-[25px]
                mb-[15px]
                block
                min-w-0
                "
          >
            <label className="block min-w-0">
              <span className="text-xs font-extrabold">البريد الإلكتروني</span>
              <div
                className="
                    focus-within:border-[var(--primary)]
                    focus-within:ring-[var(--primary)]
                    focus-within:ring-1
                    focus-within:ring-offset-0
                    focus-within:outline-none
                    focus-within:shadow-[2px_2px_5px_0.4px_var(--primary)]
                    h-[50px]
                    flex
                    items-center
                    gap-[10px]
                    border
                    border-[var(--border)]
                    rounded-[11px]
                    px-[13px]
                    text-[var(--muted)]
                    transition-all
                    duration-200
                    mt-3
                    w-full
                    min-w-0
                    "
              >
                <FiMail className="text-[var(--muted)] text-[18px]" />
                <input
                  name="email"
                  type="email"
                  onChange={handleInputChange}
                  value={inputForm.email}
                  placeholder="name@example.com"
                  autoComplete="email"
                  dir="ltr"
                  className="
                    border-0
                    outline-0
                    min-w-0
                    flex-1
                    w-full
                    bg-transparent
                    text-[var(--text)]
                    text-[12px]
                    "
                />
              </div>
              {errors.email && (
                <Message variant="error" message={errors.email} />
              )}
            </label>
            <label className="block min-w-0">
              <span className="text-xs font-extrabold">كلمة المرور</span>
              <div
                className="
                    focus-within:border-[var(--primary)]
                    focus-within:ring-[var(--primary)]
                    focus-within:ring-1
                    focus-within:ring-offset-0
                    focus-within:outline-none
                    focus-within:shadow-[2px_2px_5px_0.4px_var(--primary)]
                    h-[50px]
                    w-full
                    min-w-0
                    flex
                    items-center
                    gap-[10px]
                    border
                    border-[var(--border)]
                    rounded-[11px]
                    px-[13px]
                    text-[var(--muted)]
                    transition-all
                    duration-200
                    mt-3
                    "
              >
                <FiLock className="text-[var(--muted)] text-[18px]" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleInputChange}
                  value={inputForm.password}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  dir="ltr"
                  className="
                    border-0
                    outline-0
                    min-w-0
                    flex-1
                    w-full
                    bg-transparent
                    text-[var(--text)]
                    text-[12px]
                    "
                />

                {showPassword ? (
                  <FiEyeOff
                    className="text-[var(--muted)] text-[18px] cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                ) : (
                  <FiEye
                    className="text-[var(--muted)] text-[18px] cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                )}
              </div>
              {errors.password && (
                <Message variant="error" message={errors.password} />
              )}
            </label>
            <div
              className=" flex
                flex-wrap
                items-center
                justify-between
                gap-x-3
                gap-y-2
                text-xs"
            >
              <label
                htmlFor=""
                className="flex items-center gap-1.5 text-[var(--muted)] text-xs"
              >
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="
                    accent-[var(--primary)]
                    cursor-pointer
                    outline-offset-[3px]
                    "
                />
                <span className="">تذكرني</span>
              </label>
              <Link
                to="support"
                className="
                    text-[var(--primary)] 
                    font-black 
                    text-[11px]
                    sm:text-xs
                    text-[var(--primary)]
                    font-black
                    whitespace-nowrap"
              >
                نسيت كلمة المرور ؟
              </Link>
            </div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isPending}
            >
              <span className="flex items-center justify-center gap-3">
                {isPending ? "جاري تسجيل الدخول..." : "سجّل دخولك"}
                <FaArrowLeft size={17} />
              </span>
            </Button>
          </form>
          <p
            className="
                text-center
                text-[11px] sm:text-xs
                text-[var(--muted)]
                mt-[12px]
                mb-[15px]
                "
          >
            لسا ما عندك حساب؟
            <Link
              to="/register"
              className="text-[var(--primary)] font-extrabold"
            >
              أنشئ حساب جديد
            </Link>
          </p>
        </div>
        <div
          className="
            bg-[linear-gradient(165deg,#123e51_0%,#1b7176_100%)]
            p-5
            sm:p-7
            order-1 md:order-2
            lg:p-[42px_35px]
            relative
            flex
            flex-col
            overflow-hidden
            text-white
            before:content-['']
            before:w-[440px]
            before:h-[440px]
            before:absolute
            before:right-[-210px]
            before:top-[-170px]
            before:border
            before:border-dashed
            before:border-[rgba(255,255,255,0.18)]
            before:rounded-full
            "
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-[330px] w-[330px] rounded-full border border-white/15 md:-right-28 md:-top-28 md:h-[450px] md:w-[450px]" />

          <div className="relative z-50 w-full">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3.5 py-2 text-[10px] font-bold sm:text-xs">
              <SairnaIcon />
              عالم جديد بانتظارك
            </span>

            <h2
              className="
                relative
                z-10
                mt-4
                text-[23px]
                font-extrabold
                leading-[1.5]
                sm:mt-6
                sm:text-[28px]
                md:text-[34px]
                lg:text-[40px]
                "
            >
              كل الطرق
              <br />
              بتوصّل لذكريات.
            </h2>

            <p className="mt-2 text-[11px] text-white/75 sm:text-xs">
              ومن أول محطة رح نكون معك.
            </p>
          </div>

          <div
            className="
                relative
                z-10
                mt-6
                h-[170px]
                w-full
                sm:h-[220px]
                md:mt-8
                md:h-auto
                md:flex-1
                "
          >
            <img
              src={image}
              alt="معالم دمشق"
              className="h-full w-full -rotate-[4deg] rounded-2xl object-cover object-center shadow-2xl md:aspect-[1.45] md:max-h-[310px]"
            />
          </div>

          <div
            className="  relative
                z-10
                mt-6
                flex
                flex-wrap
                items-center
                justify-start
                gap-x-4
                gap-y-3
                pt-4
                text-[11px]
                font-bold
                sm:text-xs
                md:mt-auto
                md:pt-8"
          >
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
      </div>
    </section>
  );
}

export default LoginPage;
