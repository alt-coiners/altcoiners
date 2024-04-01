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
import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
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
  categoryId: z.string(),
});

export default function EditGuide({ id }: Props) {
  const { data } = api.guide.getGuideById.useQuery(
    { id: id },
    { enabled: id !== -1 },
  );
  const { refetch } = api.guide.getAllGuides.useQuery();
  const upsertMutation = api.guide.upsertGuide.useMutation({
    onSuccess: () => {
      void refetch();
      form.reset();
      toast({ title: id === -1 ? "Created" : "Updated" });
    },
  });
  const { data: categories } = api.guide.getGuideCategories.useQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title ?? "",
      picture: data?.picture ?? "",
      content: data?.content ?? "",
      categoryId: data?.categoryId.toString() ?? "0",
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue("title", data.title);
      form.setValue("picture", data.picture);
      form.setValue("content", data.content);
      form.setValue("categoryId", data.categoryId.toString());
    }
  }, [data, form]);

  const submitButtonRef = useRef<HTMLButtonElement>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await upsertMutation.mutateAsync({
      id: id,
      ...values,
      categoryId: parseInt(values.categoryId),
    });
  }

  return (
    <Dialog>
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
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Content<span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Content" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Category<span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories?.map((category) => (
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
