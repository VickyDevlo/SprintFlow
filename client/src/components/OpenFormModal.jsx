import { useEffect, useRef, useState } from "react";
import { Lock, Mail, MoveRight, User, X } from "lucide-react";
import { FORM_DATA } from "../assets/assets";
import { FormField } from "../shared/FormField";

const OpenFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [mode, setMode] = useState("login");
  const formRef = useRef(null);
  const isLogin = mode === "login";
  const formDetails = FORM_DATA[mode];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    await onSubmit?.({ mode, ...data });
    isLogin ? onClose() : setMode("login");
  };

  const switchMode = () => {
    setMode(formDetails.switchTo);
  };

  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement;
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      opener?.focus?.();
      setMode("register");
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) formRef.current?.querySelector("input")?.focus();
  }, [isOpen, mode]);

  return (
    <div
      inert={!isOpen}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className={`fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        className={`relative max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-3xl border border-border/60 bg-surface/80 p-6 shadow-2xl transition-all duration-300 ease-out sm:p-8 ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-4 scale-95 opacity-0"
        }`}
      >
        {/* Soft glow */}
        <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-lime/20 blur-3xl" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close form"
          className="absolute right-4 top-4 cursor-pointer rounded-full p-1.5 text-muted transition hover:bg-white/5 hover:text-text"
        >
          <X size={16} />
        </button>

        <div className="relative mb-6 text-center">
          <span className="mx-auto mb-4 block h-10 w-10 rounded-xl bg-linear-to-br from-gold to-coral" />
          <h2 id="auth-title" className="font-heading font-bold md:text-2xl">
            {formDetails.title}
          </h2>
          <p className="mt-1 text-xs text-muted md:text-sm">
            {formDetails.subtitle}
          </p>
        </div>

        <form
          key={mode}
          ref={formRef}
          onSubmit={handleSubmit}
          className="relative flex flex-col gap-3"
        >
          {!isLogin && (
            <FormField
              icon={User}
              name="name"
              placeholder="Full name"
              autoComplete="name"
            />
          )}
          <FormField
            icon={Mail}
            name="email"
            type="email"
            placeholder="Email address"
            autoComplete="email"
          />
          <FormField
            icon={Lock}
            name="password"
            type="password"
            placeholder={isLogin ? "Password" : "Password (min 8 characters)"}
            minLength={isLogin ? undefined : 8}
            autoComplete={isLogin ? "current-password" : "new-password"}
          />

          <button
            type="submit"
            className="group mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-full bg-lime py-2 font-bold text-bg transition-all duration-300 hover:brightness-110 md:px-5 md:py-3"
          >
            {formDetails.submit}
            <MoveRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </form>

        <p className="relative mt-6 text-center text-sm text-muted">
          {formDetails.prompt}{" "}
          <button
            type="button"
            onClick={switchMode}
            className="cursor-pointer font-semibold text-lime underline-offset-4 hover:underline"
          >
            {formDetails.switchLabel}
          </button>
        </p>
      </div>
    </div>
  );
};

export default OpenFormModal;
