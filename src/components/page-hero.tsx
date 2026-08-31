export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-hero">
      <div className="container-site stagger">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-2 mb-2.5 text-[32px] font-extrabold tracking-tight text-ink max-md:text-[28px]">
          {title}
        </h1>
        <p className="max-w-[620px] text-muted">{description}</p>
      </div>
    </section>
  );
}
