import { Link } from "react-router-dom";
function Button({
  children,
  type = "button",
  to,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-[var(--primary)] rounded-[3px] text-white hover:bg-[var(--bg-hover)] transition-colors cursor-pointer",
    secondary:
      "bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] hover:bg-[var(--border-color)] transition-colors cursor-pointer",
    outline:
      "bg-transparent text-[var(--text-primary)] border border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-colors cursor-pointer",
    filter:
      "bg-[var(--bg-secondary)] rounded-[3px] text-[var(--text-primary)] border border-[var(--border-color)] hover:bg-[var(--border-color)] transition-colors cursor-pointer",
    filterActive:
      "bg-[var(--accent)] rounded-[3px] text-white border border-[var(--accent)] hover:bg-[var(--accent-hover)] transition-colors cursor-pointer",
      dark:
      "bg-[var(--dark-deep)] rounded-[3px] text-white border border-[var(--dark-deep)] hover:bg-[var(--dark-hover)] transition-colors cursor-pointer",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  return (
    <>
      {to ? (
        <Link
          to={to}
          className={` ${variants[variant]} ${sizes[size]} ${className}`}
          {...props}
        >
          {children}
        </Link>
      ) : (
        <button
          className={`${variants[variant]} ${sizes[size]} ${className}`}
          {...props}
          type={type}
        >
          {children}
        </button>
      )}
    </>
  );
}

export default Button;
