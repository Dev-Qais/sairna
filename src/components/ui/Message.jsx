function Message({ message, variant = "info", className = "" }) {
  const variantClass = {
    success: "text-green-800",
    error: "text-red-800",
    warning: "text-yellow-800",
    info: "text-blue-800",
  };

  const baseClass =
    "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300";
  return (
    <div
      className={` ${baseClass} ${variantClass[variant] || variantClass.info} ${className}`}
    >
      {message}
    </div>
  );
}

export default Message;
