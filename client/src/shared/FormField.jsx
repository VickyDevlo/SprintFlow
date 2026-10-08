import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const FormField = ({ icon: Icon, type = "text", ...props }) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="relative">
      <Icon
        size={16}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
      />
      <input
        required
        aria-label={props.placeholder}
        type={isPassword && show ? "text" : type}
        className="w-full rounded-xl border border-border bg-bg/60 py-3 pl-10 
        pr-10 text-sm text-text outline-none transition placeholder:text-muted/60 focus:border-lime"
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted transition hover:text-text"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
    </div>
  );
};
