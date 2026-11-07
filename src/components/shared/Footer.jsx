import { Link } from "react-router-dom";
import { navigation, accountLinks, supportLinks } from "../data/Navigation";
import { Logo } from "../common/Logo";
import {
  FiMail,
  FiPhone,
  FiGlobe,
  FiMapPin,
  FiArrowUpLeft,
} from "react-icons/fi";

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[var(--dark-deep)] text-white">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-32 -top-40 h-[350px] w-[350px] rounded-full border border-white/5" />
      <div className="pointer-events-none absolute -left-20 -top-28 h-[250px] w-[250px] rounded-full border border-white/5" />

      <div className="container relative z-10">
        {/* Main Footer */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 sm:gap-x-10 sm:py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12 lg:py-16">
          {/* Brand Section */}
          <div className="col-span-2 flex flex-col items-start gap-5 lg:col-span-1">
            <Logo classNameP="text-[var(--primary)]" />

            <p className="max-w-[390px] text-xs leading-7 text-white/60 sm:text-sm">
              طريقة أجمل وأسهل للسفر بين المحافظات السورية. اختر رحلتك، واحجز
              بكل راحة.
            </p>

            {/* Contact Info */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:qaissh890@gmail.com"
                aria-label="البريد الإلكتروني"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white/70 transition-all duration-300 hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
              >
                <FiMail size={17} />
              </a>

              <Link
                to="/"
                aria-label="الموقع الرئيسي"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white/70 transition-all duration-300 hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
              >
                <FiGlobe size={17} />
              </Link>

              <a
                href="mailto:qaissh890@gmail.com"
                aria-label="تواصل معنا"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white/70 transition-all duration-300 hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
              >
                <FiPhone size={17} />
              </a>
            </div>

            <a
              href="mailto:qaissh890@gmail.com"
              className="flex items-center gap-2 text-xs text-white/60 transition-colors hover:text-[var(--primary)]"
            >
              <FiMail size={15} />
              qaissh890@gmail.com
            </a>
          </div>

          {/* Explore Section */}
          <div className="flex flex-col items-start gap-5">
            <h3 className="text-sm font-extrabold text-white">استكشف</h3>

            <ul className="flex flex-col items-start gap-3.5">
              {navigation.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-xs text-white/60 transition-all duration-300 hover:pr-1 hover:text-[var(--primary)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Section */}
          <div className="flex flex-col items-start gap-5">
            <h3 className="text-sm font-extrabold text-white">حسابك</h3>

            <ul className="flex flex-col items-start gap-3.5">
              {accountLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-xs text-white/60 transition-all duration-300 hover:pr-1 hover:text-[var(--primary)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div className="flex flex-col items-start gap-5">
            <h3 className="text-sm font-extrabold text-white">
              نحن هون لمساعدتك
            </h3>

            <ul className="flex flex-col items-start gap-3.5">
              {supportLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-xs text-white/60 transition-all duration-300 hover:pr-1 hover:text-[var(--primary)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href="mailto:qaissh890@gmail.com"
              className="mt-1 flex items-center gap-2 text-xs text-white/60 transition-colors hover:text-[var(--primary)]"
            >
              <FiMapPin size={15} />
              تواصل مع فريق سيرنا
              <FiArrowUpLeft size={13} />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-5 text-center sm:flex-row sm:text-right">
          <p className="text-[10px] text-white/40 sm:text-xs">
            © {new Date().getFullYear()} سيرنا. جميع الحقوق محفوظة.
          </p>

          <p className="text-[10px] text-white/40 sm:text-xs">
            صُنع بكل حب لتكون رحلتك أجمل.
            <span className="mr-1 text-[var(--primary)]">♥</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
