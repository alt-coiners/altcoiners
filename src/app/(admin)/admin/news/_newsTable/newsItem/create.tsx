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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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
  title: z.string().min(1),
  picture: z.string().min(1),
  content: z.string().min(1),
  newsCategoryId: z.string(),
  description: z.string().min(1),
  author: z.string().min(1),
});

export default function EditNews({ id }: Props) {
  const { data } = api.news.getNewsById.useQuery(
    { id: id },
    { enabled: id !== -1 },
  );
  const { refetch } = api.news.getAllNews.useQuery();
  const upsertMutation = api.news.upsertNews.useMutation({
    onSuccess: () => {
      void refetch();
      void revalidate();
      form.reset();
      toast({ title: id === -1 ? "Created" : "Updated" });
    },
  });
  const { data: newsCategories } = api.news.getAllCategories.useQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title ?? "",
      picture: data?.picture ?? "",
      content: data?.content ?? "",
      newsCategoryId: data?.newsCategoryId?.toString() ?? "0",
      description: data?.description ?? "",
      author: data?.author ?? "",
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue("title", data.title);
      form.setValue("picture", data.picture);
      form.setValue("content", data.content);
      form.setValue("newsCategoryId", data.newsCategoryId.toString());
      form.setValue("description", data.description);
      form.setValue("author", data.author);
    }
  }, [data, form]);

  const submitButtonRef = useRef<HTMLButtonElement>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await upsertMutation.mutateAsync({
      id: id === -1 ? undefined : id,
      ...values,
      newsCategoryId: +values.newsCategoryId,
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
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Author<span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Author" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newsCategoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        News Category<span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a News Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {newsCategories?.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.id.toString()}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
