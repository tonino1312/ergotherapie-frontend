export function SiteBackground() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,var(--color-primary)_1px,transparent_0)] [background-size:32px_32px] opacity-[0.05]" />

      <div className="absolute -top-32 -left-32 h-[30rem] w-[30rem] rounded-full bg-primary-light/30 blur-[110px]" />
      <div className="absolute top-1/4 -right-40 h-[28rem] w-[28rem] rounded-full bg-accent/25 blur-[110px]" />
      <div className="absolute top-[55%] left-[8%] h-[24rem] w-[24rem] rounded-full bg-primary/20 blur-[110px]" />
      <div className="absolute bottom-[-10rem] right-[10%] h-[26rem] w-[26rem] rounded-full bg-accent/20 blur-[110px]" />
      <div className="absolute bottom-[5%] left-[35%] h-[22rem] w-[22rem] rounded-full bg-primary-dark/15 blur-[110px]" />
    </div>
  );
}
