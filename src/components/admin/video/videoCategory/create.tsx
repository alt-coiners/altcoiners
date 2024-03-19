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
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface EditVideoProps {
  schoolId: number;
}

const formSchema = z.object({
  title: z.string(),
  url: z.string(),
  picture: z.string(),
  categoryId: z.number(),
});

export default function EditVideo({ schoolId }: EditVideoProps) {
  const { data: videoData } = api.video.getVideoById.useQuery(
    { id: schoolId },
    { enabled: schoolId !== -1 },
  );
  const { refetch: refetchVideos } = api.video.getAllVideos.useQuery();
  const updateVideoMutation = api.video.upsertVideo.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: videoData?.title ?? "",
      url: videoData?.url ?? "",
      picture: videoData?.picture ?? "",
      categoryId: videoData?.VideoCategory.id ?? 0,
    },
  });

  useEffect(() => {
    if (videoData) {
      form.setValue("title", videoData.title ?? "");
      form.setValue("url", videoData.url ?? "");
      form.setValue("picture", videoData.picture ?? "");
      form.setValue("categoryId", videoData.VideoCategory.id ?? 0);
    }
  }, [videoData, form]);

  const submitButtonRef = useRef<HTMLButtonElement>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateVideoMutation.mutateAsync({ id: schoolId, ...values });
    void refetchVideos();
    form.reset();
    toast({ title: "School updated" });
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>{schoolId === -1 ? "Add School" : "Edit"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-start">
          <DialogTitle className="pb-4">School Details</DialogTitle>
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Picture<span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Picture" {...field} />
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
                  {videoData ? "Update" : "Create"}
                </Button>
              </DialogTrigger>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
