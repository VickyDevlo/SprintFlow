import { MARQUEE_TECH } from "../assets/assets";

const Tech = () => {
  return (
    <section
      id="tech-stack"
      className="section mx-auto max-w-6xl scroll-mt-20  py-10 md:py-20 px-4"
    >
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        Under the hood
      </p>

      <h2 className="mt-2 font-heading text-[clamp(1.75rem,1rem+3.5vw,3.75rem)] leading-[1.2] font-bold text-balance">
        Crafted end to end, <br />
        <span className="text-lime">front to back.</span>
      </h2>

      <p className="mt-4 max-w-lg text-base text-muted md:text-[14px]">
        Built on the MERN stack: a snappy React front end, Express services, a
        MongoDB database, secure JWT sign-in, and live Socket.io updates.
      </p>

      {/* Marquee strip */}

      <div className="group mt-8 overflow-hidden border-y border-border/60 mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <ul className="flex w-max animate-marquee py-4 group-hover:[animation-play-state:paused]">
          {[...MARQUEE_TECH, ...MARQUEE_TECH].map((name, i) => (
            <li
              key={i}
              aria-hidden={i >= MARQUEE_TECH.length}
              className="flex items-center gap-5 px-5 font-mono text-lg text-muted md:text-2xl"
            >
              {name}
              <span aria-hidden="true" className="text-muted/70">
                ✦
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Tech;
