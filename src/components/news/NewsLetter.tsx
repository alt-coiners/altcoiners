import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function NewsLetter() {
  return (
    <div className="mx-auto flex max-w-[350px] flex-col gap-4 bg-primary-dark px-4 pb-6 pt-12 text-white sm:max-w-lg sm:px-6 md:max-w-xl md:px-8 lg:max-w-3xl lg:px-16 xl:max-w-5xl xl:py-6 2xl:max-w-7xl 2xl:px-24">
      <p className=" text-gray-400">
        A quick 3min read about today&apos;s crypto news!
      </p>
      <p className="text-pretty text-lg font-semibold">
        Enter your email for our Free Daily Newsletter
      </p>
      <div>
        <Input
          type="email"
          placeholder="Email"
          className="w-full rounded-none"
        />
        <Button className="w-full rounded-none py-5">Sign Up</Button>
      </div>
      <p className="text-sm text-gray-400">
        This site is protected by reCAPTCHA and the Google{" "}
        <span className="underline">Privacy Policy</span> and{" "}
        <span className="underline">Terms of Service</span> apply
      </p>
    </div>
  );
}
