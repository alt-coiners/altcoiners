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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { revalidatePath } from "next/cache";

interface Props {
  id: number;
}

const formSchema = z.object({
  title: z.string().min(1),
  url: z.string().min(1),
  description: z.string().min(1),
  content: z.string().min(1),
});

export default function EditExclusive({ id }: Props) {
  const { data } = api.exclusive.getById.useQuery(
    { id: id },
    { enabled: id !== -1 },
  );
  const { refetch } = api.exclusive.getAll.useQuery();
  const upsertMutation = api.exclusive.upsert.useMutation({
    onSuccess: () => {
      revalidatePath("/", "layout");
      void refetch();
      form.reset();
      toast({ title: id === -1 ? "Created" : "Updated" });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title ?? "",
      url: data?.url ?? "",
      description: data?.description ?? "",
      content: data?.content ?? "",
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue("title", data.title);
      form.setValue("url", data.url);
      form.setValue("description", data.description);
      form.setValue("content", data.content);
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
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Title<span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Title" {...field} />
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Description<span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Content<span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter Content" {...field} />
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
