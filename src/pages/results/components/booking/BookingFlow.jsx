import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Armchair,
  Bus,
  CalendarDays,
  Check,
  ChevronLeft,
  Info,
  Sparkles,
  Ticket,
  Users,
} from "lucide-react";

import SeatSelection from "./SeatSelection";
import PassengerDetails from "./PassengerDetails";
import BookingReview from "../BookingReview";

import useCreateBooking from "../../../../hooks/bookings/useCreateBooking";
import { useToast } from "../../../../hooks/useToast";

const steps = ["اختيار المقاعد", "بيانات المسافرين", "المراجعة والتأكيد"];

const PHONE_REGEX = /^[+0-9\s-]{9,18}$/;

function formatTime(date) {
  if (!date) return "--:--";

  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Damascus",
  }).format(new Date(date));
}

function formatDate(date) {
  if (!date) return "غير محدد";

  return new Intl.DateTimeFormat("ar-SY", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Damascus",
  }).format(new Date(date));
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-US").format(Number(price) || 0);
}

function BookingFlow({ trip, onBack, passengerCount }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengers, setPassengers] = useState([]);

  const navigate = useNavigate();
  const toast = useToast();

  const { mutateAsync: createBookingMutation, isPending: isBookingPending } =
    useCreateBooking();

  const companyName = trip.company?.name || "شركة النقل";

  const totalPrice = useMemo(
    () => Number(trip.price || 0) * selectedSeats.length,
    [trip.price, selectedSeats],
  );

  // تحديث المقاعد مع المحافظة على بيانات المسافرين
  const handleSeatsChange = (newSeats) => {
    const sortedSeats = [...newSeats].sort((a, b) => a - b);

    setSelectedSeats(sortedSeats);

    setPassengers((currentPassengers) =>
      sortedSeats.map((seatNumber) => {
        return (
          currentPassengers.find(
            (passenger) => passenger.seatNumber === seatNumber,
          ) || {
            seatNumber,
            fullName: "",
            phone: "",
          }
        );
      }),
    );
  };

  // التحقق من صحة البيانات قبل الانتقال
  const canContinue = useMemo(() => {
    if (currentStep === 1) {
      return selectedSeats.length === Number(passengerCount);
    }

    if (currentStep === 2) {
      return (
        passengers.length === Number(passengerCount) &&
        passengers.every(
          (passenger) =>
            passenger.fullName.trim().length >= 3 &&
            PHONE_REGEX.test(passenger.phone.trim()),
        )
      );
    }

    return false;
  }, [currentStep, selectedSeats, passengers, passengerCount]);

  const handleContinue = () => {
    if (!canContinue) {
      if (currentStep === 1) {
        toast.error(`يجب اختيار ${passengerCount} مقعد قبل المتابعة.`);
      } else if (currentStep === 2) {
        toast.error("يرجى التأكد من أسماء المسافرين وأرقام هواتفهم.");
      }

      return;
    }

    setCurrentStep((step) => Math.min(step + 1, 3));
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((step) => step - 1);
      return;
    }

    onBack();
  };

  // تحويل أخطاء الخادم إلى رسائل مفهومة
  const showBookingError = (error) => {
    const status = error?.response?.status;
    const responseData = error?.response?.data;

    const errorCode =
      responseData?.message || responseData?.error || responseData?.code;

    if (status === 401) {
      toast.error("انتهت جلسة تسجيل الدخول. يرجى تسجيل الدخول مجدداً.");
      return;
    }

    if (errorCode === "TRIP_ALREADY_DEPARTED") {
      toast.error("عذراً، موعد هذه الرحلة قد مضى. اختر رحلة أخرى.");
      return;
    }

    if (status === 409) {
      toast.error("أحد المقاعد لم يعد متاحاً. يرجى اختيار مقاعد أخرى.");
      return;
    }

    if (status === 400 || status === 422) {
      const validationMessage = Array.isArray(errorCode)
        ? errorCode.join("، ")
        : errorCode;

      toast.error(
        validationMessage || "يرجى التأكد من بيانات الحجز والمحاولة مجدداً.",
      );
      return;
    }

    if (!error?.response) {
      toast.error("تعذر الاتصال بالخادم. تحقق من اتصالك بالإنترنت.");
      return;
    }

    toast.error(
      typeof errorCode === "string"
        ? errorCode
        : "تعذر تأكيد الحجز. حاول مرة أخرى.",
    );
  };

  // تنفيذ الحجز الفعلي
  const handleConfirmBooking = async () => {
    if (isBookingPending) return;

    if (selectedSeats.length !== Number(passengerCount)) {
      toast.error(`يجب اختيار ${passengerCount} مقعد لإتمام الحجز.`);
      return;
    }

    if (passengers.length !== Number(passengerCount)) {
      toast.error("يرجى إدخال بيانات جميع المسافرين.");
      return;
    }

    const invalidPassenger = passengers.find(
      (passenger) =>
        !passenger.fullName?.trim() ||
        passenger.fullName.trim().length < 3 ||
        !PHONE_REGEX.test(passenger.phone?.trim() || ""),
    );

    if (invalidPassenger) {
      toast.error("يرجى التأكد من أسماء المسافرين وأرقام هواتفهم.");
      return;
    }

    const bookingData = {
      tripId: Number(trip.id),
      seats: passengers.map((passenger) => ({
        seatNumber: Number(passenger.seatNumber),
        passengerName: passenger.fullName.trim(),
        passengerPhone: passenger.phone.trim(),
      })),
    };

    try {
      const result = await createBookingMutation(bookingData);

      // لا ننتقل إلى صفحة النجاح إلا بعد نجاح الخادم
      toast.success("يا سلام! تم تأكيد حجزك بنجاح.");

      navigate("/booking-success", {
        state: {
          booking: result,
          trip,
          passengers,
          selectedSeats,
        },
      });
    } catch (error) {
      console.error("Booking error:", error.response?.data || error);

      showBookingError(error);
    }
  };

  return (
    <main className="min-h-[70vh] bg-[var(--bg)] pb-16">
      {/* Booking heading */}
      <section className="container">
        {/* Breadcrumb */}
        <nav
          aria-label="مسار الحجز"
          className="mb-6 flex flex-wrap items-center gap-2 text-[11px] font-extrabold text-[var(--muted)]"
        >
          <Link to="/" className="transition hover:text-[var(--primary)]">
            الرئيسية
          </Link>

          <ChevronLeft size={14} />

          <button
            type="button"
            onClick={onBack}
            className="transition hover:text-[var(--primary)]"
          >
            الرحلات
          </button>

          <ChevronLeft size={14} />

          <span className="text-[var(--text)]">إتمام الحجز</span>
        </nav>

        {/* Title */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-[var(--soft-teal)] px-3 py-1.5 text-[10px] font-black text-[var(--primary-deep)]">
              <Sparkles size={13} />
              باقي شوي وتوصل
            </span>

            <h1 className="text-2xl font-black text-[var(--text)] sm:text-3xl">
              كمّل حجز <span className="text-[var(--primary)]">رحلتك.</span>
            </h1>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="mb-1 flex items-center gap-2 text-xs font-bold text-[var(--muted)] transition hover:text-[var(--primary)]"
          >
            <ArrowRight size={16} />
            تغيير الرحلة
          </button>
        </div>

        {/* Stepper */}
        <div className="mb-6 flex items-center justify-center gap-2 sm:gap-4">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = currentStep === stepNumber;
            const isCompleted = currentStep > stepNumber;

            return (
              <div
                key={step}
                className="flex flex-1 items-center gap-2 sm:gap-4"
              >
                <div className="flex shrink-0 items-center gap-2">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-black transition ${
                      isActive || isCompleted
                        ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                        : "border-[var(--border)] bg-[var(--surface-alt)] text-[var(--muted)]"
                    }`}
                  >
                    {isCompleted ? <Check size={14} /> : stepNumber}
                  </span>

                  <span
                    className={`hidden whitespace-nowrap text-[10px] font-extrabold sm:block ${
                      isActive
                        ? "text-[var(--primary-deep)]"
                        : "text-[var(--muted)]"
                    }`}
                  >
                    {step}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <span
                    className={`h-px min-w-3 flex-1 ${
                      currentStep > stepNumber
                        ? "bg-[var(--primary)]"
                        : "bg-[var(--border)]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Booking layout */}
      <section className="container">
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* Main card */}
          <div className="min-w-0 overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow)] sm:p-6">
            {currentStep === 1 && (
              <>
                <div className="mb-5">
                  <h2 className="flex items-center gap-2 text-base font-black text-[var(--text)]">
                    اختار مكانك المفضّل
                    <Armchair size={22} className="text-[var(--primary)]" />
                  </h2>

                  <p className="mt-1 text-[11px] text-[var(--muted)]">
                    اختار {passengerCount} مقعد من المخطط. المقاعد الرمادية
                    محجوزة مسبقاً.
                  </p>
                </div>

                <SeatSelection
                  tripId={trip.id}
                  selectedSeats={selectedSeats}
                  onSeatsChange={handleSeatsChange}
                  passengerCount={passengerCount}
                />
              </>
            )}

            {currentStep === 2 && (
              <PassengerDetails
                passengers={passengers}
                onPassengersChange={setPassengers}
              />
            )}

            {currentStep === 3 && (
              <BookingReview
                trip={trip}
                selectedSeats={selectedSeats}
                passengers={passengers}
              />
            )}

            {/* Bottom actions */}
            <div className="mt-6 flex flex-col-reverse justify-between gap-3 border-t border-[var(--border)] pt-4 sm:flex-row">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={isBookingPending}
                className="flex items-center justify-center gap-2 rounded-xl bg-[var(--surface-alt)] px-5 py-3 text-[11px] font-black text-[var(--text)] transition hover:bg-[var(--soft-teal)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ArrowRight size={16} />
                {currentStep === 1 ? "رجوع للرحلات" : "السابق"}
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  disabled={!canContinue}
                  onClick={handleContinue}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 text-[11px] font-black text-white shadow-[0_6px_16px_rgba(10,169,155,0.18)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  متابعة الحجز
                  <ArrowLeft size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  disabled={isBookingPending}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 text-[11px] font-black text-white shadow-[0_6px_16px_rgba(10,169,155,0.18)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isBookingPending ? "جارٍ تأكيد الحجز..." : "تأكيد الحجز"}

                  {isBookingPending ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <Check size={16} />
                  )}
                </button>
              )}
            </div>

            {currentStep === 3 && (
              <p className="mt-3 flex items-center justify-center gap-2 text-center text-[10px] text-[var(--muted)]">
                <Info size={14} />
                لن يتم تأكيد الحجز إلا بعد نجاح العملية لدى الخادم.
              </p>
            )}
          </div>

          {/* Booking summary */}
          <aside className="overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow)]">
            <div className="mb-4 flex items-center gap-2 border-b border-[var(--border)] pb-4">
              <Ticket size={19} className="text-[var(--primary)]" />

              <h3 className="text-sm font-black text-[var(--text)]">
                ملخص الحجز
              </h3>
            </div>

            {/* Company */}
            <div className="mb-4 flex items-center gap-3">
              {trip.company?.logoUrl ? (
                <img
                  src={trip.company.logoUrl}
                  alt={companyName}
                  className="h-11 w-11 rounded-xl border border-[var(--border)] object-contain"
                />
              ) : (
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--soft-teal)] text-lg font-black text-[var(--primary-deep)]">
                  {companyName.charAt(0)}
                </span>
              )}

              <div className="min-w-0">
                <strong className="block truncate text-xs font-black text-[var(--text)]">
                  {companyName}
                </strong>

                <small className="text-[10px] text-[var(--muted)]">
                  رحلة مباشرة
                </small>
              </div>
            </div>

            {/* Route */}
            <div className="mb-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-xl bg-[var(--surface-alt)] p-3">
              <div>
                <small className="block text-[9px] text-[var(--muted)]">
                  الانطلاق
                </small>

                <strong className="mt-1 block text-xs font-black text-[var(--text)]">
                  {trip.origin?.name || "غير محدد"}
                </strong>

                <span className="text-[10px] text-[var(--muted)]">
                  {formatTime(trip.departureAt)}
                </span>
              </div>

              <ArrowLeft size={18} className="text-[var(--primary)]" />

              <div className="text-left">
                <small className="block text-[9px] text-[var(--muted)]">
                  الوصول
                </small>

                <strong className="mt-1 block text-xs font-black text-[var(--text)]">
                  {trip.destination?.name || "غير محدد"}
                </strong>

                <span className="text-[10px] text-[var(--muted)]">
                  {formatTime(trip.arrivalAt)}
                </span>
              </div>
            </div>

            {/* Trip details */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="flex items-center gap-1.5 text-[10px] text-[var(--muted)]">
                  <CalendarDays size={13} />
                  تاريخ الرحلة
                </span>

                <strong className="text-left text-[10px] font-bold text-[var(--text)]">
                  {formatDate(trip.departureAt)}
                </strong>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-[10px] text-[var(--muted)]">
                  <Users size={13} />
                  المسافرين
                </span>

                <strong className="text-[10px] font-bold text-[var(--text)]">
                  {passengerCount}
                </strong>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-[10px] text-[var(--muted)]">
                  <Armchair size={13} />
                  المقاعد
                </span>

                <strong className="text-[10px] font-bold text-[var(--text)]">
                  {selectedSeats.length
                    ? selectedSeats.join("، ")
                    : "لم تُحدّد بعد"}
                </strong>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-[10px] text-[var(--muted)]">
                  <Bus size={13} />
                  السعر للمسافر
                </span>

                <strong className="text-[10px] font-bold text-[var(--text)]">
                  {formatPrice(trip.price)} ل.س
                </strong>
              </div>
            </div>

            {/* Total */}
            <div className="my-4 border-t border-dashed border-[var(--border)]" />

            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-black text-[var(--text)]">
                السعر الإجمالي
              </span>

              <strong className="text-base font-black text-[var(--primary)]">
                {formatPrice(totalPrice)} ل.س
              </strong>
            </div>

            {/* Trust note */}
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-[var(--surface-alt)] p-3 text-[9px] leading-5 text-[var(--muted)]">
              <Info size={15} className="shrink-0 text-[var(--primary)]" />
              لا يوجد دفع حقيقي ضمن المشروع التعليمي.
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default BookingFlow;
