import { CheckCircle2, Clock, XCircle, Info } from "lucide-react";
import { bookingStatus } from "../utils/bookingFormatters";

const statusIcons = {
  CONFIRMED: CheckCircle2,
  PENDING: Clock,
  CANCELLED: XCircle,
};

function BookingStatus({ status }) {
  const config = bookingStatus[status] || {
    label: status || "غير معروف",
    className: "bg-gray-100 text-gray-600 border-gray-200",
  };

  const StatusIcon = statusIcons[status] || Info;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-black ${config.className}`}
    >
      <StatusIcon size={13} />
      {config.label}
    </span>
  );
}

export default BookingStatus;
