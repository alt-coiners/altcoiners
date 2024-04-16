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
import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { UploadButton } from "@/utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface EditVideoProps {
  videoId: number;
}

const formSchema = z.object({
  title: z.string().min(1),
  url: z.string().min(1),
  picture: z.string().min(1),
  categoryId: z.number(),
});

export default function EditVideo({ videoId }: EditVideoProps) {
  const { data } = api.video.getVideoById.useQuery(
    { id: videoId },
    { enabled: videoId !== -1 },
  );
  const { refetch: refetchVideos } = api.video.getAllVideos.useQuery();
  const updateVideoMutation = api.video.upsertVideo.useMutation({
    onSuccess: () => {
      void refetchVideos();
      form.reset();
      toast({ title: "Video updated" });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title ?? "",
      url: data?.url ?? "",
      picture: data?.picture ?? "",
      categoryId: data?.VideoCategory.id ?? 0,
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue("title", data.title ?? "");
      form.setValue("url", data.url ?? "");
      form.setValue("picture", data.picture ?? "");
      form.setValue("categoryId", data.VideoCategory.id ?? 0);
    }
  }, [data, form]);

  const submitButtonRef = useRef<HTMLButtonElement>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateVideoMutation.mutateAsync({
      id: videoId,
      ...values,
    });
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>{videoId === -1 ? "Add Video" : "Edit"}</Button>
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        URL<span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="picture"
                  render={({}) => (
                    <FormItem>
                      <FormLabel>
                        Picture<span className="text-red-600">*</span>
                      </FormLabel>
                      {(form.watch("picture") || !!data?.picture?.length) && (
                        <Image
                          src={form.watch("picture") ?? data?.picture}
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
                          form.setValue("picture", res[0]?.url ?? "");
                        }}
                        onUploadError={(error: Error) => {
                          alert(`ERROR! ${error.message}`);
                        }}
                      />
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
