"use client";

import { api } from "@/trpc/react";
import { useState } from "react";
import * as z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "@/hooks/use-toast";

const emailSchema = z.string().email();

export default function NewsLetter() {
  const [email, setEmail] = useState("");
  const saveEmailToNewsLetterMutation = api.newsletter.insert.useMutation({
    onSuccess: () => {
      setEmail("");
      toast({
        title: "Success",
        description: "You have successfully subscribed to our newsletter",
      });
    },
  });

  return (
    <div className="bg-primary-dark mx-auto flex max-w-[350px] flex-col gap-4 px-4 pb-6 pt-12 text-white sm:max-w-lg sm:px-6 md:max-w-xl md:px-8 lg:max-w-3xl lg:px-16 xl:max-w-5xl xl:py-6 2xl:max-w-7xl 2xl:px-24">
      <p className="text-gray-400">
        A quick 3min read about today&apos;s crypto news!
      </p>
      <p className="text-pretty text-lg font-semibold">
        Enter your email for our Free Daily Newsletter
      </p>
      <div>
        <Input
          type="email"
          placeholder="Email"
          className="w-full rounded-none text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          className="w-full rounded-none py-5"
          onClick={() => {
            if (!emailSchema.safeParse(email).success) {
              toast({
                title: "Please enter a valid email address",
                variant: "destructive",
              });
              return;
            }
            saveEmailToNewsLetterMutation.mutate({ email });
          }}
          disabled={saveEmailToNewsLetterMutation.isPending}
        >
          {saveEmailToNewsLetterMutation.isPending ? "Submitting" : "Sign Up"}
        </Button>
      </div>
      <p className="text-sm text-gray-400">
        This site is protected by reCAPTCHA and the Google{" "}
        <span className="underline">Privacy Policy</span> and{" "}
        <span className="underline">Terms of Service</span> apply
      </p>
    </div>
  );
}

export const NewsLetterFooter = () => {
  const [email, setEmail] = useState("");
  const saveEmailToNewsLetterMutation = api.newsletter.insert.useMutation({
    onSuccess: () => {
      setEmail("");
      toast({
        title: "Success",
        description: "You have successfully subscribed to our newsletter",
      });
    },
  });

  return (
    <div className="sm:mx-auto sm:w-3/4 lg:mx-0 lg:flex lg:items-center">
      <Input
        type="email"
        placeholder="Email"
        className="w-full rounded-none text-black"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        className="w-full rounded-none py-5 text-sm lg:w-1/3"
        onClick={() => {
          if (!emailSchema.safeParse(email).success) {
            toast({
              title: "Please enter a valid email address",
              variant: "destructive",
            });
            return;
          }
          saveEmailToNewsLetterMutation.mutate({ email });
        }}
        disabled={saveEmailToNewsLetterMutation.isPending}
      >
        {saveEmailToNewsLetterMutation.isPending ? "Submitting" : "Sign Up"}
      </Button>
    </div>
  );
};
