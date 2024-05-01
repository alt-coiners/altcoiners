"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useAdminLoginStore } from "@/utils/store/adminLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const ADMIN_USERNAME = "altcoiners";
const ADMIN_PASSWORD = "vgfk@1565";

const formSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export default function LoginForm() {
  const router = useRouter();
  const { setIsLoggedIn } = useAdminLoginStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (
      values.username !== ADMIN_USERNAME ||
      values.password !== ADMIN_PASSWORD
    ) {
      toast({ title: "Invalid username or password", variant: "destructive" });
      return;
    }
    setIsLoggedIn(true);
    toast({ title: "Logged in" });
    return router.push("/admin");
  }

  return (
    <div className="fixed inset-0 flex h-screen w-full items-center justify-center bg-gray-200">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-3xl">Login</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="max-h-[60vh] space-y-3 overflow-y-auto px-2 pb-10"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button type="submit" className="hidden" ref={submitButtonRef}>
                Submit
              </button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => submitButtonRef.current?.click()}
          >
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
