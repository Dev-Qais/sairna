import { useEffect } from "react";
import {
  FiCheckCircle,
  FiXCircle,
  FiInfo,
  FiX,
  FiAlertTriangle,
} from "react-icons/fi";
import { motion } from "framer-motion";

function Toast({ message, type, onClose, duration = 3000 }) {
  const variants = {
    success: {
      icon: <FiCheckCircle />,
      title: "تمت العملية بنجاح",
      color: "text-emerald-500",
      border: "border-emerald-500/30",
    },
    error: {
      icon: <FiXCircle />,
      title: "حدث خطأ",
      color: "text-red-500",
      border: "border-red-500/30",
    },
    info: {
      icon: <FiInfo />,
      title: "معلومة",
      color: "text-sky-500",
      border: "border-sky-500/30",
    },
    warning: {
      icon: <FiAlertTriangle />,
      title: "تنبيه",
      color: "text-amber-500",
      border: "border-amber-500/30",
    },
  };

  const currentVariant = variants[type] || variants.info;

  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`w-[min(380px,calc(100vw-32px))] rounded-2xl border ${currentVariant.border} bg-[var(--surface)] p-4 shadow-[var(--shadow-md)]`}
    >
      <div className="flex items-start gap-3">
        <span className={`mt-1 text-xl ${currentVariant.color}`}>
          {currentVariant.icon}
        </span>

        <div className="min-w-0 flex-1">
          <h4 className="font-bold text-[var(--text)]">
            {currentVariant.title}
          </h4>

          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
            {message}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق الإشعار"
          className="text-[var(--muted)] transition-colors hover:text-[var(--text)]"
        >
          <FiX size={18} />
        </button>
      </div>
    </motion.div>
  );
}

export default Toast;
