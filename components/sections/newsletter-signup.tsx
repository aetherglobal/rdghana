"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

interface NewsletterSignupProps {
  privacyPolicyUrl: string;
  pdpoNoticeUrl: string;
}

export function NewsletterSignup({
  privacyPolicyUrl,
  pdpoNoticeUrl,
}: NewsletterSignupProps): React.ReactElement {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid || !agreed) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/newsletter-subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent: agreed }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="module-wrapper">
      <div
        className="relative isolate space-y-[10px] rounded-[30px] p-7 pt-10 shadow-2xl lg:p-10 lg:pl-[30%]"
        style={{
          backgroundImage:
            'linear-gradient(57.4deg, #6c29ed 3.23%, #00ccff 95.61%), url("/images/home/newsletter-bg.svg")',
          backgroundSize: "contain",
          backgroundPosition: "center, right -25px top",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "overlay",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 -z-10 h-full w-full overflow-hidden rounded-[30px]"
        >
          <Image
            src="/images/home/newsletter-icon.svg"
            alt=""
            width={288}
            height={226}
            className="absolute left-[39%] top-[32%] h-auto w-[167px] lg:-left-[34px] lg:top-auto lg:bottom-[-10px] lg:w-72 xl:left-0 xl:bottom-[-8px]"
          />
        </div>

        <h2 className="text-h2 text-white xl:text-title">Subscribe Our Newsletter</h2>
        <div className="text-p2 text-white xl:text-p1">
          <p>
            Get the latest news on RD&apos;s innovative breakthroughs, achievements, events and
            future initiatives.
          </p>
        </div>

        <div className="relative z-10 pt-20 lg:pt-0">
          <form onSubmit={(e) => void handleSubmit(e)} className="relative">
            <div className="flex flex-col gap-5 rounded-[30px] bg-white px-4 py-5 text-left shadow-2xl md:grid md:grid-cols-[1fr_auto] md:items-center md:rounded-full md:py-2">
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  aria-label="Email address"
                  className="h-16 w-full rounded-[21.5px] border-0 bg-white p-5 text-ink outline-none placeholder:text-center placeholder:text-muted md:placeholder:text-left"
                />
              </div>
              <div className="mx-auto min-w-[172px] md:ml-auto md:mr-0">
                <button
                  type="submit"
                  className="m-auto w-full cursor-pointer rounded-full bg-gradient-primary px-5 py-4 text-h6 text-white shadow-2xl"
                >
                  Subscribe
                </button>
              </div>
            </div>

            <label className="mt-4 flex items-start">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="h-6 w-6 shrink-0 rounded-full border-gray-300 accent-[#00CCFF]"
              />
              <span className="ml-2 text-p3 text-white">
                I have read and agree to the{" "}
                <a
                  href={privacyPolicyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href={pdpoNoticeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Notice relating to the Personal Data (Privacy) Ordinance
                </a>{" "}
                (“Notice”). &nbsp;By subscribing to RD Technologies&apos; newsletter, I agree to
                the use and transfer of my personal data for direct marketing by RD Technologies
                in accordance with the Notice.
              </span>
            </label>

            <div
              className={cn(
                "grid w-full",
                "lg:absolute lg:-mt-2",
                status === "idle" || status === "submitting"
                  ? "pointer-events-none absolute -mt-2"
                  : "mt-2",
              )}
            >
              <p
                className={cn(
                  "col-start-1 row-start-1 rounded-[30px] bg-success px-8 py-2 text-notice1 text-white shadow-2xl transition-all duration-200 ease-in-out",
                  status === "success" ? "opacity-100" : "opacity-0",
                )}
              >
                You&apos;re all set! You have successfully subscribed to our e-newsletter. Welcome
                aboard!
              </p>
              <p
                className={cn(
                  "col-start-1 row-start-1 rounded-[30px] bg-danger px-8 py-2 text-notice1 text-white shadow-2xl transition-all duration-200 ease-in-out",
                  status === "error" ? "opacity-100" : "opacity-0",
                )}
              >
                We&apos;re sorry, but there was an error processing your subscription request. Please
                try again later or contact our support team for assistance.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
