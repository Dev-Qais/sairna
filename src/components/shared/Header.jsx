import { Logo } from "../common/Logo";
import { NavLink } from "react-router-dom";
import { navigation } from "../data/Navigation";
import Button from "../ui/Button";
import { BiArrowToLeft, BiMoon, BiSun } from "react-icons/bi";
import { useThemeStore } from "../../store/useThemeStore";
import { useAuthStore } from "../../store/authStore";
import { FaBars } from "react-icons/fa6";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const { isAuthenticated, user } = useAuthStore();
  return (
    <header className="sticky top-0 z-80 bg-[var(--surface)] border-b border-[var(--border)]">
      <div className="container h-[83px] flex items-center justify-between gap-[22px]">
        <Logo
          classNameStrong="text-[var(--dark-deep)]"
          classNameP="text-[var(--primary)]"
        />
        <nav className="flex items-center max-sm:hidden min-sm:hidden min-md:hidden min-lg:block mx-auto">
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
        <div className="actions flex items-center gap-[12px]">
          {isDarkMode ? (
            <button
              onClick={toggleDarkMode}
              className="w-[40px] h-[40px] flex items-center justify-center bg-[var(--dark-deep)] rounded-[12px] text-[var(--text)] border border-[var(--border)] hover:bg-[var(--primary)] hover:border-[var(--primary)]  transition-colors cursor-pointer"
            >
              <BiSun size="20px" />
            </button>
          ) : (
            <button
              variant="dark"
              onClick={toggleDarkMode}
              className="w-[40px] h-[40px] flex items-center justify-center bg-[var(--surface)] text-[var(--text)] rounded-[12px] hover:border-[var(--primary)] border border-[var(--border)] hover:text-[var(--primary)] hover:  transition-colors cursor-pointer"
            >
              <BiMoon size="20px" />
            </button>
          )}
          {isAuthenticated && (
            <select name="profile" id="">
              <option value="" className="flex items-center gap-[8px]">
                <Button
                  to="/profile"
                  size="sm"
                  variant="dark"
                  className="flex items-center gap-[8px]"
                >
                  <p>
                    {user?.name || "الملف الشخصي"} {user?.email} {user?.image}
                  </p>{" "}
                  <BiArrowToLeft />
                </Button>
              </option>
            </select>
          )}
          {!isAuthenticated && (
            <Button
              to="/login"
              size="sm"
              variant="primary"
              className="flex items-center max-sm:hidden"
            >
              تسجيل الدخول
            </Button>
          )}
          {!isAuthenticated && (
            <Button
              to="/register"
              size="sm"
              variant="dark"
              className="flex items-center max-sm:hidden"
            >
              {" "}
              إنشاء حساب
              <BiArrowToLeft />
            </Button>
          )}

          <button className="min-sm:hidden w-[40px] h-[40px] flex items-center justify-center rounded-[12px] bg-[var(--surface)] border border-[var(--border)]  hover:border-[var(--primary)] hover:text-[var(--primary)]  transition-colors cursor-pointer">
            {isOpen ? 
            <FaBars size={20} /> : 
            <FaTimes size={20} />

            }
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
