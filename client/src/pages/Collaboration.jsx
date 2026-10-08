import { Check } from "lucide-react";
import { COLLABORATION_POINTS, MESSAGES } from "../assets/assets";
import Stats from "../components/Stats";

const Collaboration = () => {
  return (
    <section
      id="collaboration"
      className="section mx-auto grid max-w-6xl scroll-mt-20 items-center gap-5 py-10 md:py-20 px-4 lg:grid-cols-2 lg:gap-10"
    >
      {/* Left: copy */}
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Teamwork
        </p>

        <h2 className="mt-2 font-heading text-[clamp(1.75rem,1rem+3.5vw,3.75rem)] leading-[1.2] font-bold text-balance">
          Teamwork that feels <span className="text-lime">effortless.</span>
        </h2>

        <p className="mt-4 max-w-md text-base text-muted md:text-[14px]">
          Tag a teammate, drop a note, and watch changes land live — no extra
          meetings or status pings needed.
        </p>

        <ul className="mt-6 flex flex-col gap-2">
          {COLLABORATION_POINTS.map((point) => (
            <li key={point} className="flex items-center gap-2 font-medium">
              <Check size={18} strokeWidth={3} className="shrink-0 text-lime" />
              {point}
            </li>
          ))}
        </ul>
      </div>
      {/* Right: chat thread card */}
      <div className="rounded-3xl border border-border/60 bg-surface/60 p-5 sm:p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Thread · Build login flow
        </p>

        <div className="mt-5 flex flex-col gap-3">
          {MESSAGES.map(({ id, from, text, own }) => (
            <div
              key={id}
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                own
                  ? "self-end rounded-br-sm bg-lime/90 text-bg"
                  : "self-start rounded-bl-sm bg-white/10 text-text"
              }`}
            >
              <p
                className={`text-xs font-bold ${own ? "text-bg/70" : "text-muted"}`}
              >
                {from}
              </p>
              <p className="mt-0.5 max-md:text-[11px]">{text}</p>
            </div>
          ))}

          {/* Typing indicator: same shape as the received bubbles */}
          <div
            aria-label="Someone is typing"
            className="flex w-fit items-center gap-1.5 self-start rounded-2xl rounded-bl-sm bg-white/10 px-4 py-3"
          >
            {[0, 150, 300].map((delay) => (
              <span
                key={delay}
                style={{ animationDelay: `${delay}ms` }}
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-full">
        <Stats />
      </div>
    </section>
  );
};
export default Collaboration;
