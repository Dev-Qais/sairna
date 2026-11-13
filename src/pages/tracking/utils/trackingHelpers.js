export const formatTime = (date) => {
  if (!date) return "--:--";

  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Damascus",
  }).format(new Date(date));
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

export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US").format(Number(price) || 0);
};

export const formatDuration = (seconds) => {
  if (!Number.isFinite(seconds)) return null;

  const totalMinutes = Math.round(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes} دقيقة`;
  if (minutes === 0) return `${hours} ساعة`;

  return `${hours} ساعة و ${minutes} دقيقة`;
};

export const getCoordinates = (location) => {
  if (!location) return null;

  const latitude = Number(location.latitude);
  const longitude = Number(location.longitude);

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    Math.abs(latitude) > 90 ||
    Math.abs(longitude) > 180
  ) {
    return null;
  }

  return [latitude, longitude];
};

export const getTripDuration = (departureAt, arrivalAt) => {
  if (!departureAt || !arrivalAt) return null;

  const difference =
    new Date(arrivalAt).getTime() - new Date(departureAt).getTime();

  if (!Number.isFinite(difference) || difference <= 0) {
    return null;
  }

  return formatDuration(difference / 1000);
};
