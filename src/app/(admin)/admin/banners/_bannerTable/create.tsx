"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { api } from "@/trpc/react";
import revalidate from "@/utils/revalidate";
import { UploadButton } from "@/utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface Props {
  id: number;
}

const formSchema = z.object({
  name: z.string().min(1),
  url: z.string().min(1),
  redirectUrl: z.string().min(1),
});

export default function EditBanner({ id }: Props) {
  const { data } = api.banner.getById.useQuery(
    { id: id },
    { enabled: id !== -1 },
  );
  const { refetch } = api.banner.getAll.useQuery();
  const upsertMutation = api.banner.upsert.useMutation({
    onSuccess: () => {
      void refetch();
      void revalidate();
      form.reset();
      toast({ title: id === -1 ? "Created" : "Updated" });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? "",
      url: data?.url ?? "",
      redirectUrl: data?.redirectUrl ?? "",
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue("name", data.name);
      form.setValue("url", data.url);
      form.setValue("redirectUrl", data.redirectUrl);
    }
  }, [data, form]);

  const submitButtonRef = useRef<HTMLButtonElement>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await upsertMutation.mutateAsync({
      id: id === -1 ? undefined : id,
      ...values,
    });
  }

  return (
    <Dialog key={id}>
      <DialogTrigger>
        <Button>{id === -1 ? "Add" : "Edit"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-start">
          <DialogTitle className="pb-4">Details</DialogTitle>
          <DialogDescription className="">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="max-h-[60vh] space-y-3 overflow-y-auto px-2 pb-10"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Name<span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="url"
                  render={({}) => (
                    <FormItem>
                      <FormLabel>
                        Picture<span className="text-red-600">*</span>
                      </FormLabel>
                      {(form.watch("url") || !!data?.url?.length) && (
                        <Image
                          src={form.watch("url") ?? data?.url}
                          width={200}
                          height={200}
                          className="mx-auto"
                          alt="image"
                        />
                      )}
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          toast({ title: "Image uploaded" });
                          form.setValue("url", res[0]?.url ?? "");
                        }}
                        onUploadError={(error: Error) => {
                          alert(`ERROR! ${error.message}`);
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="redirectUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Redirect URL<span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter redirect URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="hidden" ref={submitButtonRef}>
                  Submit
                </Button>
              </form>
            </Form>
            <div className="flex justify-evenly">
              <DialogTrigger asChild>
                <Button
                  variant={"secondary"}
                  className="w-[45%] justify-center rounded-xl"
                >
                  Cancel
                </Button>
              </DialogTrigger>
              <DialogTrigger asChild>
                <Button
                  variant={"default"}
                  className="w-[45%] justify-center rounded-xl"
                  onClick={() => submitButtonRef.current?.click()}
                >
                  {data ? "Update" : "Create"}
                </Button>
              </DialogTrigger>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
