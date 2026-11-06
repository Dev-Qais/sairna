import { useState } from "react";
import image from "../../assets/image.jpg";
import SairnaIcon from "../../components/common/SairnaIcon";
function RegisterPage() {
  const [inputValues, setInputValues] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;

    setInputValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  }
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <section className="mt-14 mb-20 mx-0 bg-[var(--bg)]">
      <div
        className=" 
            mx-6
            grid 
            grid-cols-[1fr_1fr] 
            bg-[var(--surface)] 
            border border-[var(--border)] 
            rounded-3xl min-h-[100vh] 
            shadow-[var(--shadow)] 
            overflow-hidden"
      >
        {/* Text */}
        <div className="py-12 px-20 flex flex-col justify-center">
          <div>
            <span
              className="
            inline-flex 
            items-center 
            gap-2 
            bg-[var(--soft-teal)]
            rounded-4xl
            text-xs
            font-bold
            w-fit
            text-[var(--primary)]
            px-3.5
            py-1.5"
            >
              <SairnaIcon /> انظم معنا لعائلة سيرنا
            </span>
            <h1 className="text-3xl mt-8 mb-1.5 leading-1.5 font-extrabold -tracking-widest">
              خلّينا نبدأ المشوار سوا.
            </h1>
            <p className="text-xs text-[var(--muted)] mt-10">
              حساب بسيط، ورحلاتك كلها بين إيديك.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 mt-6 mb-4"
          >
            <label htmlFor="fullName">الاسم الكامل</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder=" اسمك الكامل"
              className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl px-4 py-2 text-sm placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              value={inputValues.fullName}
              onChange={handleChange}
            />
            <input
              name="email"
              type="email"
              placeholder="البريد الإلكتروني"
              className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl px-4 py-2 text-sm placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              value={inputValues.email}
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              placeholder="كلمة المرور"
              className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl px-4 py-2 text-sm placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              value={inputValues.password}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-[var(--primary)] text-white rounded-3xl px-4 py-2 text-sm hover:bg-[var(--primary-hover)] transition-colors"
            >
              إنشاء حساب
            </button>
          </form>
          <div></div>
          <div></div>
        </div>
        {/* Visual */}
        <div className="bg-[linear-gradient(165deg,#123e51_0%,#1b7176_100%)] py-10 px-9 relative flex flex-col text-[#fff] overflow-hidden">
          <div className="relative z-20 ">
            <span
              className="
            inline-flex 
            items-center 
            gap-2 
            bg-white/12
            rounded-4xl
            text-xs
            font-bold
            px-3.5
            py-1.5"
            >
              <SairnaIcon /> عالم جديد بانتظارك
            </span>
            <h2 className="text-[40px] leading-1.55 mt-6 mb-1 font-extrabold">
              كل الطرق
              <br />
              بتوصّل لذكريات.
            </h2>
            <p className="text-[#d7f0eb] text-xs mb-10">
              ومن أول محطة رح نكون معك.
            </p>
            <div className="absolute top-0 -right-20 w-[60%] h-[110%] border border-[var(--primary)] rounded-full opacity-20"></div>
          </div>
          <div>
            <div className="absolute bottom-0 right-0 w-[60%] h-[40%] bg-[var(--primary)] rounded-full opacity-20"></div>
            <img
              src={image}
              alt=""
              className="relative object-cover object-center max-h-[300px] aspect-[1.45] w-[105%] my-auto mt-8 mx-[-2.5%] rounded-2xl shadow-2xl -rotate-6"
            />
          </div>
          <div className="flex items-center gap-6 mt-8 relative text-xs">
            <span className="flex items-center gap-2">
              <SairnaIcon /> عالم جديد بانتظارك
            </span>
            <span className="flex items-center gap-2">
              <SairnaIcon /> حجز بخطوات بسيطة
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
