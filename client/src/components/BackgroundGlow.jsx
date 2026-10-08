
const BackgroundGlow = () => {
  return (
    <>
      <div className="pointer-events-none absolute -left-40 top-0 h-125 w-125 rounded-full bg-lime/20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-40 h-125 w-125 rounded-full bg-coral/20 blur-[160px]" />
    </>
  );
};

export default BackgroundGlow;
