import { Logo } from "../common/Logo";
import { NavLink } from "react-router-dom";
import { navigation } from "../data/Navigation";
import Button from "../ui/Button";
import { BiMoon, BiSun } from "react-icons/bi";
import { useThemeStore } from "../../store/useThemeStore";
import { useAuthStore } from "../../store/authStore";
import { FaArrowDown, FaArrowLeft, FaBars, FaX } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useRef } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const { isAuthenticated, user } = useAuthStore();
  const headerRef = useRef(null);

  function handleClickOutside(event) {
    if (headerRef.current && !headerRef.current.contains(event.target)) {
      if (isOpen) {
        setIsOpen(false);
      }
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-[80] bg-[var(--surface)] border-b border-[var(--border)] backdrop-blur-lg"
    >
      <div className="container h-[83px] flex items-center justify-between gap-[22px]">
        <Logo
          classNameStrong="text-[var(--dark-deep)]"
          classNameP="text-[var(--primary)]"
        />
        <nav className="items-center hidden lg:flex mx-auto">
          <ul className="flex items-center gap-[27px] max-sm:gap-[8px] max-md:gap-[12px] mx-auto">
            {navigation.map((nav) => (
              <li key={nav.path}>
                <NavLink
                  to={nav.path}
                  className={({ isActive }) => `
                    relative
                    text-[var(--muted)]
                    after:absolute
                    after:bottom-[-17px]
                    after:rounded-[5px]
                    after:right-1/2
                    after:transition-all
                    after:duration-300
                    after:w-0
                    after:h-[3px]
                    after:bg-[var(--primary)]
                    font-bold
                    text-[12px]
                    tracking-[0.1px]
                    ${
                      isActive
                        ? "text-[var(--text)] after:w-[23px] after:translate-x-1/2"
                        : "hover:text-[var(--text)] hover:after:w-[23px] hover:after:translate-x-1/2"
                    }
                `}
                >
                  {nav.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        {/* Actions */}
        <div className="actions flex items-center gap-[12px]">
          {isDarkMode ? (
            <button
              onClick={toggleDarkMode}
              className="w-[40px] h-[40px] flex items-center justify-center bg-[var(--dark-deep)] rounded-[12px] text-[var(--text)] border border-[var(--border)] hover:bg-[var(--primary)] hover:border-[var(--primary)]  transition-all duration-300 cursor-pointer"
            >
              <BiSun size="20px" />
            </button>
          ) : (
            <button
              onClick={toggleDarkMode}
              className="w-[40px] h-[40px] flex items-center justify-center bg-[var(--surface)] text-[var(--text)] rounded-[12px] hover:border-[var(--primary)] border border-[var(--border)] hover:text-[var(--primary)]  transition-all duration-300 cursor-pointer"
            >
              <BiMoon size="20px" />
            </button>
          )}

          {!isAuthenticated ? (
            <div className="flex items-center justify-between">
              <Button
                to="/login"
                size="sm"
                variant="transparent"
                className="flex items-center max-lg:hidden"
              >
                دخول
              </Button>
              <Button
                to="/register"
                size="sm"
                variant="dark"
                className="flex items-center  max-lg:hidden hover:-translate-y-1.5 hover:bg-[#174d61]"
              >
                {" "}
                إنشاء حساب
                <FaArrowLeft size={20} className="mr-2" />
              </Button>
            </div>
          ) : (
            <Button
              to="/profile"
              size="sm"
              variant="transparent"
              className="flex items-center gap-[5px] max-lg:hidden  cursor-pointer"
            >
              <span>
                {user?.image ? (
                  <img
                    src={user.image}
                    alt="User"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <span className="w-8 h-8 rounded-full bg-[var(--primary)] text-[var(--primary-deep)] text-xl flex items-center justify-center">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                )}
              </span>
              <p>
                {user?.name || "الملف الشخصي"}
                {user?.email} {user?.image}
                <FaArrowDown size={15} className="ml-2 inline" />
              </p>
            </Button>
          )}

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={isOpen}
            className="flex lg:hidden w-[40px] h-[40px]  items-center justify-center rounded-[12px] bg-[var(--surface)] border border-[var(--border)]  hover:border-[var(--primary)] hover:text-[var(--primary)]  transition-colors cursor-pointer"
          >
            {isOpen ? <FaX size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute z-50 top-full right-0 transition-all duration-500 bg-[var(--surface)] min-w-full  border-t border-[var(--border)] py-3 px-7">
          <div className="">
            {navigation.map((e) => (
              <NavLink
                to={e.path}
                key={e.path}
                className={({ isActive }) => `
                    flex items-center
                    justify-between
                    text-[var(--muted)]
                    border-b
                    border-[var(--border)]
                    font-bold
                    py-3
                    px-2
                    ${
                      isActive
                        ? "text-[var(--primary)]"
                        : "text-[var(--text)] hover:text-[var(--primary)]"
                    }
                `}
              >
                <p>{e.label}</p>{" "}
                <p>
                  <FaArrowLeft size={20} />
                </p>
              </NavLink>
            ))}
            {isAuthenticated ? (
              <div className="w-full    ">
                <Button
                  variant="transparent"
                  size="md"
                  to="/profile"
                  className="text-[var(--text)]
                    border-b
                    border-[var(--border)]
                    font-bold
                    py-3
                    px-2 w-full 
                    "
                >
                  حسابي
                </Button>
              </div>
            ) : (
              <div className="w-full flex flex-col justify-between items-start">
                <Button
                  variant="transparent"
                  size="md"
                  to="/register"
                  className="text-[var(--muted)]
                    border-b
                    border-[var(--border)]
                    font-bold
                    py-3
                    px-2 w-full"
                >
                  إنشاء حساب
                </Button>
                <Button
                  variant="transparent"
                  to="/login"
                  className="text-[var(--muted)]
                    border-b
                    border-[var(--border)]
                    font-bold
                    py-3
                    px-2 w-full"
                >
                  تسجيل الدخول
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
