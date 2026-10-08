import { STATS } from "../assets/assets";

const Stats = () => {
  return (
    <section className="mx-auto max-w-6xl  py-2 md:py-10">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {STATS.map(({ value, label }) => (
          <div
            key={label}
            className="rounded-2xl border border-border/60 bg-surface/60 p-5 sm:p-6"
          >
            <p className="font-heading text-[clamp(1.75rem,1rem+2.5vw,3rem)] font-bold leading-none text-lime">
              {value}
            </p>
            <p className="mt-3 font-mono text-xs max-md:text-center uppercase tracking-widest text-muted">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
