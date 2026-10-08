import { MoveDown, MoveRight } from "lucide-react";
import { useScrollToSection } from "../hooks/useScrollToSection";
import { AVATARS } from "../assets/assets";

const HeroSection = () => {
  const { navigateToSection } = useScrollToSection();
  return (
    <section
      id="home"
      className="section max-w-4xl mx-auto text-center py-10 md:py-20 mt-12 max-md:min-h-screen"
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-center font-mono text-[clamp(0.6875rem,0.625rem+0.2vw,0.8125rem)] uppercase tracking-wider text-muted sm:px-4 sm:py-2 sm:tracking-widest">
        <span className="relative flex h-3 w-3 shrink-0 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-50" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
        </span>
        Live for teams · Now in open beta
      </span>

      <h1 className="mt-5 flex flex-col items-center text-center font-heading text-[clamp(2.25rem,1.25rem+5vw,5rem)] font-bold leading-[1.05] tracking-wide">
        Align fast.
        <span className="bg-linear-to-r from-coral via-gold to-lime bg-clip-text text-transparent">
          Deliver what matters.
        </span>
      </h1>

      <p className="mx-auto mt-2 md:mt-8 max-w-xl text-center text-[clamp(1rem,0.9rem+0.5vw,1.25rem)] leading-relaxed text-muted">
        Sprint-Flow brings tasks, talk, and timelines into one shared space, so
        great ideas become shipped results.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button className="flex items-center justify-center gap-2 rounded-full bg-lime max-md:text-sm px-4 py-2 md:px-8 md:py-4  cursor-pointer font-bold text-bg transition hover:brightness-110">
          Start building <MoveRight strokeWidth={1.5} color="#07070f" />
        </button>
        <button
          onClick={() => navigateToSection("tasks")}
          className="flex items-center justify-center gap-2 rounded-full cursor-pointer max-md:text-sm px-4 py-2 md:px-8 md:py-4 border border-border font-bold transition hover:bg-surface"
        >
          Take the tour <MoveDown strokeWidth={1.5} size={18} />
        </button>
      </div>

      <div className="mt-10 flex items-center flex-col justify-center text-muted">
        <div className="flex -space-x-2">
          {AVATARS.map((avatar) => (
            <span
              key={avatar.l}
              className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-bg text-sm font-bold text-white ${avatar.c}`}
            >
              {avatar.l}
            </span>
          ))}
        </div>
        <span className="mx-auto mt-1 max-w-xl text-center text-[10px] md:text-sm leading-relaxed text-muted">
          Where tasks, talk, and timelines finally live together
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
