import { useEffect } from "react";
import { X } from "lucide-react";

export const Modal = ({ title, subtitle, onClose, children }) => {
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative flex max-h-[90dvh] w-full max-w-md flex-col overflow-hidden rounded-3xl border border-border/60 bg-surface/95 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 cursor-pointer rounded-full p-1.5 text-muted transition hover:bg-white/5 hover:text-text"
        >
          <X size={16} />
        </button>

        {/* Header (fixed) */}
        <div className="shrink-0 px-6 pt-6 sm:px-8 sm:pt-8">
          <h2 className="pr-8 font-heading text-2xl font-bold text-text">
            {title}
          </h2>
          {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
        </div>

        {/* Content area: children decide what scrolls */}
        <div className="mt-5 flex min-h-0 flex-1 flex-col px-6 pb-6 sm:px-8 sm:pb-8">
          {children}
        </div>
      </div>
    </div>
  );
};