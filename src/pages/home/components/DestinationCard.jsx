import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import aleppoImage from "../../../assets/allepo.jpg";
import damascusImage from "../../../assets/damascus.jpg";
import homsImage from "../../../assets/homs.jpg";
import latakiaImage from "../../../assets/latakia.jpg";

const destinationImages = {
  دمشق: damascusImage,
  حلب: aleppoImage,
  حمص: homsImage,
  اللاذقية: latakiaImage,
};

function DestinationCard({ city, subtitle }) {
  const navigate = useNavigate();
  const image = destinationImages[city];

  const handleNavigate = () => {
    navigate("/results");
  };

  return (
    <button
      type="button"
      onClick={handleNavigate}
      aria-label={`استكشف رحلات ${city}`}
      className="group relative min-w-0 overflow-hidden rounded-[20px] border border-[var(--border)] text-right transition-all duration-300 ease-out hover:-translate-y-2 hover:border-[var(--primary)] hover:shadow-[var(--shadow-md)]"
    >
      {/* Destination Image */}
      <div className="relative aspect-[0.82/1] w-full overflow-hidden">
        <img
          src={image}
          alt={city}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-deep)]/90 via-[var(--dark-deep)]/10 to-transparent" />

        {/* Destination Info */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
          <div className="min-w-0 text-right text-white">
            <h3 className="text-lg font-black">{city}</h3>

            <p className="mt-1 text-xs font-semibold text-white/75">
              {subtitle}
            </p>
          </div>

          {/* Arrow */}
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/50 bg-white/20 text-white backdrop-blur-sm transition-all duration-300 group-hover:border-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white">
            <ArrowLeft
              size={17}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
          </span>
        </div>
      </div>
    </button>
  );
}

export default DestinationCard;
