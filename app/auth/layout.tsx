import Image from "next/image";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[496px] mx-auto my-auto">
          <Image
            src="/assets/icons/logo-full.svg"
            width={1000}
            height={1000}
            alt="CareConnect"
            className="mb-12 h-10 w-fit"
          />
          {children}
          <div className="text-14-regular mt-20 flex justify-center">
            <p className="text-dark-600">@2024 CareConnect</p>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="authentication"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
