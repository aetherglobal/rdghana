import Image from "next/image";

export function CompanyHero(): React.ReactElement {
  return (
    <section
      id="top"
      style={{ backgroundImage: "url(/images/company/who-we-are-blur.png)" }}
      className="module-wrapper -mt-[72px] flex h-[calc(484px-60px)] flex-col items-center gap-y-5 bg-cover bg-center bg-no-repeat pt-[calc(60px+40px)] md:h-[calc(600px-60px)] md:gap-y-10 md:pt-[calc(60px+90px)] lg:h-[calc(870px-120px)] lg:bg-contain lg:pt-[calc(120px+110px)] xl:-mt-[140px]"
    >
      <div className="flex w-full max-w-[464px] items-center xl:max-w-[559px] min-[1440px]:max-w-[679px]">
        <Image
          src="/images/company/who-we-are.png"
          alt="RD Technologies"
          width={1358}
          height={538}
          priority
          className="h-auto w-full"
        />
      </div>

      <div className="max-w-[816px] text-center text-p1 text-ink">
        <p>
          RD Technologies deploys innovative technologies to build a business world interconnected by
          trust.
        </p>
        <p>
          Based in Hong Kong, the international financial center and global trading hub, RD
          Technologies was born out of a mission to make cross-border payments easier and cheaper,
          and drive financial inclusiveness for businesses.
        </p>
      </div>
    </section>
  );
}
