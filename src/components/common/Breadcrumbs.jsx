import { Link, useLocation } from "react-router-dom";

const pageNames = {
  "/results": "نتائج البحث",
  "/companies": "شركات النقل",
  "/booking": "احجز رحلة",
  "/trips": "حجوزاتي",
  "/tracking": "تتبع الرحلة",
  "/profile": "الملف الشخصي",
};

function Breadcrumbs() {
  const location = useLocation();

  const currentPage = pageNames[location.pathname];

  if (!currentPage) return null;

  return (
    <nav
      aria-label="مسار التنقل"
      className="
      container
  flex
  items-center
  gap-[8px]
  text-[var(--muted)]
  text-[11px]
  font-extrabold
  my-[22px]
"
    >
      <Link
        to="/"
        className="text-[var(--muted)] hover:text-[var(--primary)] transition-all duration-500"
      >
        الرئيسية
      </Link>{" "}
      <span aria-hidden="true" className="text-[var(--muted)]">
        &gt;
      </span>{" "}
      <span aria-current="page" className="text-[var(--text)]">
        {currentPage}
      </span>
    </nav>
  );
}

export default Breadcrumbs;
