import { FOOTER_LINKS, MENU_NAV_LINKS, SOCIAL_LINKS } from "@/utils/constant";
import Image from "next/image";
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
              style={{
                clipPath: "polygon(0 0, 95% 0, 100% 35%, 100% 100%, 0 100%)",
              }}
            />
            <Button
              className="w-full rounded-none py-6"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 8% 100%, 0 65%)",
              }}
            >
              Sign Up
            </Button>
          </div>
          <p className="text-xs text-gray-400">
            This site is protected by reCAPTCHA and the Google{" "}
            <span className="underline">Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service</span> apply
          </p>
          <div className="my-4 flex flex-col gap-5 lg:hidden">
            {MENU_NAV_LINKS.map((link) => (
              <a key={link.title} href={link.href} className="font-medium">
                {link.title}
              </a>
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
              <a key={link.title} href={link.href}>
                <Image
                  src={link.icon}
                  alt={link.title}
                  width={16}
                  height={16}
                  className="hover:opacity-80"
                />
              </a>
            ))}
          </div>
        </div>
        <div className="hidden gap-6 lg:flex">
          {MENU_NAV_LINKS.map((link) => (
            <div key={link.title} className="flex flex-col gap-2">
              <p className="mb-4 text-sm font-semibold">{link.title}</p>
              {link.subMenus.map((child) => (
                <a
                  key={child.title}
                  href={child.url}
                  className="text-xs text-gray-400 hover:underline"
                >
                  {child.title}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="my-4 flex w-5/6 justify-center gap-5 self-center lg:hidden">
        {MENU_NAV_LINKS.map((link) => (
          <a key={link.title} href={link.href} className="text-sm">
            {link.title}
          </a>
        ))}
      </div>
      <div className="mt-8 lg:flex lg:items-center lg:justify-between">
        <p className="text-center text-sm text-gray-400">
          © 2024 Altcoiners.live . All rights reserved
        </p>
        <div className="hidden gap-5 lg:flex lg:gap-8">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="font-medium hover:underline"
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>
      <div className="hidden justify-end gap-8 lg:flex">
        <p className="text-center text-sm text-gray-400">Have a story?</p>
        <p className="text-center text-sm text-gray-400">Advertising</p>
      </div>
    </div>
  );
}
