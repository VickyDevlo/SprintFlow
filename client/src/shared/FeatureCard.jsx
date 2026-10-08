export const FeatureCard = ({
  as: Tag = "article",
  icon: Icon,
  title,
  text,
  badge,
  className = "",
}) => {
  return (
    <Tag
      className={`group relative isolate overflow-hidden rounded-2xl border border-border/60 bg-surface/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-lime/40 ${className}`}
    >
      {/* Bottom-right glow circle */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -right-10 -z-10 h-40 w-40 rounded-full bg-lime/40 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />  

      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-bg text-lime">
          <Icon size={20} />
        </span>
        {badge && (
          <span className="font-mono text-xs tracking-widest text-muted">
            {badge}
          </span>
        )}
      </div>

      <h3 className="mt-6 font-heading text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm text-muted">{text}</p>
    </Tag>
  );
};
