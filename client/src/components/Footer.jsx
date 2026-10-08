const FOOTER_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Support", href: "mailto:support@sprintflow.com" },
  { label: "Contact", href: "mailto:hello@sprintflow.com" },
];

const Footer = ({ onLinkClick }) => {
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-8">
      <div className="flex flex-col items-center gap-4 border-t border-border/60 pt-8 text-center text-sm text-muted md:flex-row md:justify-between md:text-left">
        {/* Logo */}
        <div className="flex items-center gap-2 font-heading text-lg font-bold text-muted">
          <span className="h-5 w-5 rounded-md bg-linear-to-br from-gold to-coral" />
          SprintFlow
        </div>

        {/* Links with dot separators */}
        <ul className="flex flex-wrap items-center justify-center gap-x-2">
          {FOOTER_LINKS.map(({ label, id, action }, i) => (
            <li key={label} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">·</span>}
              <button
                type="button"
                onClick={() => onLinkClick?.({ id, action })}
                className="cursor-pointer transition hover:text-text"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Copyright */}
        <p>© {new Date().getFullYear()} SprintFlow. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
