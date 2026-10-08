import { HOW_IT_WORKS_STEPS } from "../assets/assets";
import { FeatureCard } from "../shared/FeatureCard";

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="section mx-auto max-w-6xl scroll-mt-20  py-10 md:py-20 px-4"
    >
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        How it works
      </p>

      <h2 className="mt-2 font-heading text-[clamp(1.75rem,1rem+3.5vw,3.75rem)] leading-[1.2] font-bold text-balance">
        Simple to start. <br /> <span className="text-lime">Easy to use.</span>
      </h2>

      <p className="mt-4 max-w-lg text-base text-muted md:text-[14px]">
        Set up in minutes, then let every task show who owns it, when it's due,
        and where it stands.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {HOW_IT_WORKS_STEPS.map((step, i) => (
          <FeatureCard
            key={step.title}
            as="li"
            badge={String(i + 1).padStart(2, "0")}
            {...step}
          />
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
