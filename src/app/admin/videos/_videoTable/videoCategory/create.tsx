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
import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface EditVideoProps {
  videoCategoryId: number;
}

const formSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
});

export default function EditVideoCategory({ videoCategoryId }: EditVideoProps) {
  const { data: videoData } = api.video.getCategoryById.useQuery(
    { id: videoCategoryId },
    { enabled: videoCategoryId !== -1 },
  );
  const { refetch: refetchVideoCategories } =
    api.video.getVideoCategories.useQuery();
  const updateVideoCategoryMutation = api.video.upsertVideoCategory.useMutation(
    {
      onSuccess: () => {
        void refetchVideoCategories();
        form.reset();
        toast({ title: "Video Category updated" });
      },
    },
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: videoData?.name ?? "",
      description: videoData?.description ?? "",
    },
  });

  useEffect(() => {
    if (videoData) {
      form.setValue("name", videoData.name ?? "");
      form.setValue("description", videoData.description ?? "");
    }
  }, [videoData, form]);

  const submitButtonRef = useRef<HTMLButtonElement>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateVideoCategoryMutation.mutateAsync({
      id: videoCategoryId,
      ...values,
    });
  }

  return (
    <Dialog key={videoCategoryId}>
      <DialogTrigger>
        <Button>
          {videoCategoryId === -1 ? "Add Video Category" : "Edit"}
        </Button>
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Name<span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Name" {...field} />
                      </FormControl>
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
                        <Textarea placeholder="Enter Description" {...field} />
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
