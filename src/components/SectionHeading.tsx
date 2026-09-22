type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, subtitle, id }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <p className="mb-2 text-[0.7rem] font-semibold tracking-[0.28em] text-rose uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className="font-display text-4xl text-ink italic sm:text-5xl">
        {title}
      </h2>
      <div className="gold-line mx-auto mt-4 h-px w-24" />
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-ink-soft">{subtitle}</p>
      ) : null}
    </div>
  );
}
