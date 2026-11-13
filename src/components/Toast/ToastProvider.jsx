import Toast from "./Toast";
import { useState } from "react";
import { ToastContext } from "./ToastContext";

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info", duration = 3000) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }]);
  };

  const success = (message, duration = 3000) => {
    addToast(message, "success", duration);
  };

  const error = (message, duration = 3000) => {
    addToast(message, "error", duration);
  };

  const info = (message, duration = 3000) => {
    addToast(message, "info", duration);
  };

  const warning = (message, duration = 3000) => {
    addToast(message, "warning", duration);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const handleClose = (id) => {
    removeToast(id);
  };

  return (
    <ToastContext.Provider
      value={{ toasts, handleClose, success, error, info, warning }}
    >
      {children}

      {toasts.length > 0 && (
        <div className="fixed top-24 right-5 z-[100] flex flex-col gap-3">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onClose={() => handleClose(toast.id)}
            />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
