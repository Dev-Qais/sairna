import Eyebrow from "../../../components/ui/Eyebrow";

import {
  FaRegCircleCheck,
  FaRegStar,
  FaLocationDot,
  FaShieldHalved,
} from "react-icons/fa6";

import heroImage from "../../../assets/image(1).jpg";
import SearchBox from "./SearchBox";

function Hero() {
  const features = ["حجز سهل", "خيارات متنوعة", "متابعة رحلتك"];

  const avatars = [
    { letter: "م", color: "#f3d2a6" },
    { letter: "س", color: "#E4BED1" },
    { letter: "ع", color: "#C2DADB" },
    { letter: "ر", color: "#B9D2ED" },
  ];

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[linear-gradient(160deg,var(--surface-alt),var(--surface),var(--bg))]
        pt-[65px]
        pb-[71px]
        before:content-['']
        before:absolute
        before:w-[540px]
        before:h-[540px]
        before:rounded-full
        before:bg-[radial-gradient(circle,rgba(76,203,175,0.1),transparent_66%)]
        before:top-[-180px]
        before:left-[-140px]
        before:pointer-events-none
      "
    >
      <div className="container">
        {/* Hero Grid */}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[0.95fr_1.05fr]
            items-center
            gap-[36px]
            min-h-[420px]
          "
        >
          {/* Hero Content */}
          <div className="relative z-[1] pb-9 min-w-0">
            <Eyebrow>أهلاً فيك بسيرنا</Eyebrow>

            {/* Heading */}
            <h1
              className="
                text-[clamp(40px,5.15vw,79px)]
                mt-[19px]
                mb-[11px]
                tracking-[-2.4px]
                leading-[1.33]
                font-black
                text-[var(--text)]
              "
            >
              المحطة الجاية؟
              <br />
              <span
                className="
                  bg-[linear-gradient(93deg,#078a91,#15ba9d_75%)]
                  text-transparent
                  bg-clip-text
                "
              >
                على كيفك.
              </span>
            </h1>

            {/* Description */}
            <p
              className="
                text-[16px]
                leading-[2.15]
                max-w-[485px]
                mb-[22px]
                text-[var(--muted)]
              "
            >
              من حلب لدمشق، ومن الساحل للجزيرة. لاقي الرحلة اللي بتناسبك، اختار
              مقعدك، وخلّي الطريق علينا.
            </p>

            {/* Features */}
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-x-[20px]
                gap-y-[12px]
              "
            >
              {features.map((feature) => (
                <span
                  key={feature}
                  className="
                    flex
                    items-center
                    gap-[6px]
                    py-0.5
                    px-1.5
                    text-[var(--text)]
                    bg-[var(--surface-alt)]
                    rounded-[11px]
                    font-extrabold
                    text-[11px]
                  "
                >
                  <FaRegCircleCheck className="text-[var(--primary-deep)]" />
                  {feature}
                </span>
              ))}
            </div>

            {/* Social Proof & Rating */}
            <div
              className="
                flex
                items-center
                flex-wrap
                gap-4
                mt-10
              "
            >
              {/* User Avatars */}
              <div className="flex items-center">
                {avatars.map((user, index) => (
                  <span
                    key={index}
                    className="
                      grid
                      place-items-center
                      w-[35px]
                      h-[35px]
                      -ml-[7px]
                      rounded-full
                      border-[3px]
                      border-[var(--surface)]
                      font-black
                      text-[#5e3a36]
                    "
                    style={{ backgroundColor: user.color }}
                  >
                    {user.letter}
                  </span>
                ))}
              </div>

              {/* Rating */}
              <div className="flex flex-col gap-[3px]">
                <div
                  className="
                    flex
                    items-center
                    gap-[5px]
                    text-[#f7b843]
                    leading-[1.5]
                  "
                >
                  <div className="flex items-center gap-[3px]">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaRegStar key={index} size={17} />
                    ))}
                  </div>

                  <b className="text-[13px]">4.9/5</b>
                </div>

                <small className="text-[var(--muted)] text-[11px]">
                  تجربة سفر بتستاهل تجرّبها
                </small>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div
            className="
              relative
              w-full
              min-w-0
              py-[18px]
              lg:pr-[20px]
            "
          >
            {/* Image Frame */}
            <div
              className="
                relative
                isolate
                w-full
                aspect-[1.45]
                rounded-[30px]
                rotate-[-1.5deg]
                shadow-[0_30px_70px_rgba(10,62,70,0.15)]
                overflow-visible
              "
            >
              {/* Main Image */}
              <div
                className="
                  absolute
                  inset-0
                  overflow-hidden
                  rounded-[30px]
                  bg-[#a8ddd2]
                "
              >
                <img
                  src={heroImage}
                  alt="صورة حقيقية للجامع الأموي في دمشق"
                  className="
                    absolute
                    inset-0
                    block
                    w-full
                    h-full
                    max-w-none
                    object-cover
                    object-center
                    saturate-[1.03]
                  "
                />

                {/* Image Caption */}
                <span
                  className="
                    absolute
                    bottom-[17px]
                    left-[18px]
                    z-[1]
                    text-white
                    bg-[rgba(12,43,53,0.72)]
                    py-[5px]
                    px-[11px]
                    rounded-[8px]
                    text-[10px]
                    font-bold
                  "
                >
                  صورة حقيقية من دمشق
                </span>
              </div>

              {/* Floating Location Badge */}
              <div
                className="
                  absolute
                  top-[35px]
                  -left-[22px]
                  z-10
                  flex
                  items-center
                  gap-[12px]
                  bg-white
                  rounded-[16px]
                  py-[13px]
                  px-[17px]
                  shadow-[0_8px_25px_rgba(15,45,60,0.12)]
                "
              >
                <FaLocationDot className="text-[#0bb5a5] shrink-0" size={17} />

                <div className="flex flex-col gap-[3px] whitespace-nowrap">
                  <b className="text-[12px] text-[#164456]">14 محافظة</b>

                  <span className="text-[10px] text-[#8299a5]">
                    وجهات بتجمعنا
                  </span>
                </div>
              </div>

              {/* Floating Safety Badge */}
              <div
                className="
                  absolute
                  bottom-[75px]
                  -right-[20px]
                  z-10
                  flex
                  items-center
                  gap-[12px]
                  bg-white
                  rounded-[16px]
                  py-[13px]
                  px-[17px]
                  shadow-[0_8px_25px_rgba(15,45,60,0.12)]
                "
              >
                <span
                  className="
                    grid
                    place-items-center
                    w-[37px]
                    h-[37px]
                    shrink-0
                    rounded-[11px]
                    bg-[#e2f8f3]
                    text-[#0bb5a5]
                  "
                >
                  <FaShieldHalved size={17} />
                </span>

                <div className="flex flex-col gap-[3px] whitespace-nowrap">
                  <b className="text-[12px] text-[#164456]">سافر براحة</b>

                  <span className="text-[10px] text-[#8299a5]">
                    من أول الحجز لآخر محطة
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Box - سيتم تنفيذه لاحقاً */}
        <div className="mt-[50px]">
          <SearchBox />
        </div>
      </div>
    </section>
  );
}

export default Hero;
