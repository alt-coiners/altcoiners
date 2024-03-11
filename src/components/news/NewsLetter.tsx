import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function NewsLetter() {
  return (
    <div
      className="mx-auto flex max-w-[350px] flex-col gap-4 bg-primary-dark px-4 pb-6 pt-12 text-white"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 8% 100%, 0 90%)",
      }}
    >
      <p className="text-sm text-gray-400">
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
    </div>
  );
}
