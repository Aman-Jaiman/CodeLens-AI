import { Badge } from '@/components/ui/Badge';

export function SectionHeading({ badge, title, subtitle, align = 'center' }) {
  const aligns = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div className={`flex flex-col ${aligns[align]} space-y-3`}>
      {badge ? <Badge>{badge}</Badge> : null}
      <h2 className="font-display text-3xl font-bold tracking-tight text-bright sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-2xl text-base text-muted sm:text-lg">{subtitle}</p>
      ) : null}
    </div>
  );
}
