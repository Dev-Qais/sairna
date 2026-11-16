export const bookingStatus = {
  CONFIRMED: {
    label: "مؤكد",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  PENDING: {
    label: "قيد الانتظار",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  CANCELLED: {
    label: "ملغي",
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

export const formatDate = (date) => {
  if (!date) return "غير محدد";

  return new Intl.DateTimeFormat("ar-SY", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Damascus",
  }).format(new Date(date));
};

export const formatTime = (date) => {
  if (!date) return "--:--";

  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Damascus",
  }).format(new Date(date));
};

export const formatPrice = (price) =>
  new Intl.NumberFormat("en-US").format(Number(price) || 0);
