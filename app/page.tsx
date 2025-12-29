import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            width={1000}
            height={1000}
            alt="CareConnect"
            className="mb-12 h-10 w-fit"
          />

          <div className="space-y-6">
            <section className="mb-12 space-y-4">
              <h1 className="header">Welcome to CareConnect</h1>
              <p className="text-dark-700">
                Your healthcare management platform. Book appointments, manage your medical records, and stay connected with your healthcare providers.
              </p>
            </section>

            <div className="space-y-4">
              <Link href="/auth/signup" className="block">
                <Button className="w-full shad-primary-btn">
                  Get Started
                </Button>
              </Link>

              <p className="text-center text-sm text-dark-700">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-green-500 hover:underline">
                  Login
                </Link>
              </p>
            </div>

            <div className="mt-8 p-4 bg-dark-400 rounded-lg">
              <h3 className="text-sm font-semibold text-white mb-2">Key Features:</h3>
              <ul className="text-sm text-dark-700 space-y-1">
                <li>• Easy appointment scheduling</li>
                <li>• Secure medical records</li>
                <li>• SMS appointment reminders</li>
                <li>• 24/7 access to your health information</li>
              </ul>
            </div>
          </div>

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              @2024 CareConnect
            </p>
            <Link href="/auth/login" className="text-green-500">
              Admin Login
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="healthcare"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
