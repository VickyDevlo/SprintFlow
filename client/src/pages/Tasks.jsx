import { FEATURES } from "../assets/assets";
import { FeatureCard } from "../shared/FeatureCard";

const Tasks = () => {
  return (
    <section
      id="tasks"
      className="section mx-auto max-w-6xl py-10 md:py-20 px-4"
    >
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        Task management, simplified
      </p>

      <h2 className="mt-2 font-heading text-[clamp(1.75rem,1rem+3.5vw,3.75rem)] leading-[1.2] font-bold text-balance">
        Every task has
        <br />
        an <span className="text-lime">owner and a date.</span>
      </h2>

      <p className="mt-4 max-w-lg text-base text-muted md:text-[14px]">
        Create tasks, assign them, set deadlines, and track progress in one
        place, so nothing slips through the cracks.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
};
export default Tasks;
