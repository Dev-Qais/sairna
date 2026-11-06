import { Link } from "react-router-dom";

// import {logo} from "../../assets/logo.svg"
export function Logo({ classNameP, classNameStrong, classNameSmall }) {
  return (
    <Link
      to="/"
      className="logo inline-flex items-center gap-2.5 shrink-0 grow-0 basis-auto"
    >
      <img
        src="https://res.cloudinary.com/dbjckxjul/image/upload/v1793771971/logo_rh2paf.svg"
        alt="Logo"
        className="w-[48px] h-[48px] grid place-items-center shrink-0 grow-0 basis-auto"
      />
      <div className="flex flex-col items-start justify-center leading-1.2 shrink-0 grow-0 basis-auto">
        <strong
          className={`ml-2 text-[30px] tracking-[-1.5] font-black font-bold block ${classNameStrong}`}
        >
          سيرنا <b className={classNameP}>.</b>
        </strong>
        <small
          className={`ml-[7px] text-[9px] font-bold text-[var(--muted)]  ${classNameSmall}`}
        >
          رحلتك بتبلّش من هون
        </small>
      </div>
    </Link>
  );
}

// export default Logo;
