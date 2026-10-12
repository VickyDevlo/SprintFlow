export const Section = ({ id, className = "", children }) => {
  return (
    <section id={id} className={`w-full scroll-mt-16 px-5 py-10 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
};
