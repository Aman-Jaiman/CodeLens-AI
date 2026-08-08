import { SectionHeading } from '@/components/ui/SectionHeading';
import { Accordion } from '@/components/ui/Accordion';
import { landingContent } from '@/data/content';

export function FAQ() {
  const { faq } = landingContent;

  return (
    <section id="faq" className="py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="FAQ"
          title="Frequently asked questions"
          subtitle="Everything you need to know about the AI Code Reviewer."
        />

        <div className="mt-12">
          <Accordion items={faq} />
        </div>
      </div>
    </section>
  );
}
