import SairnaIcon from "../common/SairnaIcon";

function Eyebrow({ children }) {
  return (
    <span
      className="
        inline-flex
        items-center
        gap-[8px]
        bg-[var(--soft-teal)]
        text-[var(--primary-deep)]
        rounded-full
        py-[5px]
        px-[14px]
        text-[11px]
        font-black
        tracking-[0.12px]
        "
    >
      <SairnaIcon />
      {children}
    </span>
  );
}

export default Eyebrow;
