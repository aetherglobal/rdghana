import { Reveal } from "@/components/ui/reveal";

export function VisionMission(): React.ReactElement {
  return (
    <section className="module-wrapper">
      <div className="relative z-10">
        <Reveal className="text-center">
          <h2 className="module-title font-medium! text-ink">
            Our Vision
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-h6 font-medium! text-ink md:text-h5 lg:text-h3">
            To enable the seamless flow of capital, breaking down geographical barriers to empower
            the global economy.
          </p>
        </Reveal>

        <Reveal
          delay={1}
          className="relative mt-10 overflow-hidden rounded-[32px] border border-[#c9d6ff] px-6 py-10 text-center backdrop-blur-xl md:px-20 md:py-14"
          style={{ background: "var(--gradient-soft-card-2)" }}
        >
          <h3 className="text-gradient-primary mx-auto w-fit module-title font-medium! md:w-auto">
            Our Mission
          </h3>
          <p className="mx-auto mt-4 text-h6 font-medium! text-ink md:text-h5 lg:text-h3">
            To revolutionize global payments by building a next-generation infrastructure based on
            tokenized currencies, making transactions cheaper, faster, and more secure for businesses
            worldwide.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
