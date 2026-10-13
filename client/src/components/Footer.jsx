import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { FOOTER_COLUMNS } from "../assets/assets";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: hook up to API later
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="mx-auto max-w-6xl px-4 pb-8 pt-16">
      <div className="grid gap-12 border-t border-border/60 pt-12 lg:grid-cols-[1.4fr_2fr]">
        {/* Brand + newsletter */}
        <div className="max-w-sm">
          <div className="flex items-center gap-2 font-heading text-xl font-bold text-text">
            <span className="h-6 w-6 rounded-md bg-linear-to-br from-gold to-coral" />
            SprintFlow
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Plan sprints, assign tasks and ship together. One board for your
            whole team, from first idea to done.
          </p>

          <form onSubmit={handleSubscribe} className="mt-6">
            <label
              htmlFor="footer-email"
              className="text-sm font-medium text-text"
            >
              Get product updates
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="min-w-0 flex-1 rounded-lg border border-border/60 bg-transparent px-3 py-2 text-sm text-text placeholder:text-muted focus:border-gold focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-linear-to-br from-gold to-coral text-black transition hover:opacity-90"
              >
                {subscribed ? <Check size={18} /> : <ArrowRight size={18} />}
              </button>
            </div>
            {subscribed && (
              <p className="mt-2 text-xs text-gold" role="status">
                Thanks, you're on the list!
              </p>
            )}
          </form>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-4">
          {FOOTER_COLUMNS.map(({ title, links }) => (
            <div key={title}>
              <h3 className="font-heading text-sm font-semibold text-text">
                {title}
              </h3>
              <ul className="mt-4 space-y-3 text-muted">
                {links.map((link) => (
                  <li
                    key={link.label}
                    className="cursor-pointer hover:text-text transition-all"
                  >
                    {link.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 flex flex-col items-center gap-4 border-t border-border/60 pt-6 text-sm text-muted md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} SprintFlow. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
