import { FOOTER_LINKS, MENU_NAV_LINKS, SOCIAL_LINKS } from "@/utils/constant";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Footer() {
  return (
    <div className="flex w-full flex-col gap-3 bg-primary-dark px-3 py-10 text-white min-[425px]:px-5 sm:px-6 lg:gap-6 xl:px-32 2xl:px-52 3xl:px-64">
      <div className="w-full lg:flex lg:justify-between lg:gap-10">
        <div className="flex w-full flex-col gap-3 lg:w-2/5 lg:gap-6">
          <Image
            src="/images/altcoiners-logo.png"
            width={125}
            height={75}
            className="lg:h-auto lg:w-36"
            quality={100}
            alt="logo"
          />
          <p className="text-sm text-gray-400">
            A quick 3min read about today&apos;s crypto news!
          </p>
          <p className="text-pretty text-lg font-semibold">
            Enter your email for our Free Daily Newsletter
          </p>
          <div className="sm:mx-auto sm:w-3/4 lg:mx-0 lg:flex lg:items-center">
            <Input
              type="email"
              placeholder="Email"
              className="w-full rounded-none"
            />
            <Button className="w-full rounded-none py-5">Sign Up</Button>
          </div>
          <p className="text-xs text-gray-400">
            This site is protected by reCAPTCHA and the Google{" "}
            <span className="underline">Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service</span> apply
          </p>
          <div className="my-4 flex flex-col gap-5 lg:hidden">
            {MENU_NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.href ?? ""}
                className="font-medium"
              >
                {link.title}
              </Link>
            ))}
          </div>
          <p className="w-5/6 text-xs text-gray-400">
            The information on this website is for educational purposes only,
            and investing carries risks. Always do your research before
            investing, and be prepared for potential losses.
          </p>
          <p className="w-5/6 text-xs text-gray-400">
            18+ and Gambling: Online gambling rules vary by country; please
            follow them. This website provides entertainment content, and using
            it means you accept out terms. We may include partnership links, but
            they don&apos;t affect our ratings or recommendations.
          </p>
          <p className="w-5/6 text-xs text-gray-400">
            Crypto promotions on this site do not comply with the UK Financial
            Promotions Regime and are not intended for UK consumers.
          </p>
          <div className="hidden items-center gap-4 lg:flex">
            {SOCIAL_LINKS.map((link) => (
              <a key={link.title} href={link.href} target="_blank">
                <Image
                  src={link.icon}
                  alt={link.title}
                  width={16}
                  height={16}
                  quality={100}
                  className="hover:opacity-80"
                />
              </a>
            ))}
          </div>
        </div>
        <div className="hidden grid-cols-5 gap-4 lg:grid">
          {MENU_NAV_LINKS.map((link) => (
            <div key={link.title} className="flex flex-col gap-2">
              <p className="mb-4 text-sm font-semibold">{link.title}</p>
              {link.subMenus.map((child) => (
                <Link
                  key={child.title}
                  href={child.url}
                  className="text-xs text-gray-400 hover:underline"
                >
                  {child.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="my-4 flex w-5/6 justify-center gap-5 self-center lg:hidden">
        {MENU_NAV_LINKS.map((link) => (
          <Link key={link.title} href={link.href ?? ""} className="text-sm">
            {link.title}
          </Link>
        ))}
      </div>
      <div className="mt-8 lg:flex lg:items-center lg:justify-between">
        <p className="text-center text-sm text-gray-400">
          © 2024 Altcoiners.live . All rights reserved
        </p>
        <div className="hidden gap-5 lg:flex lg:gap-8">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="font-medium hover:underline"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="hidden justify-end gap-8 lg:flex">
        <p className="text-center text-sm text-gray-400">Have a story?</p>
        <Link
          href={
            "https://docs.google.com/forms/d/e/1FAIpQLSdlW0aeiOr2R4SlZP1yCLpQw-vDXDudx0CetWidp6tAT1Hu2g/viewform?usp=sf_link"
          }
          target="_blank"
        >
          <p className="text-center text-sm text-gray-400 hover:underline">
            Advertising
          </p>
        </Link>
      </div>
    </div>
  );
}
