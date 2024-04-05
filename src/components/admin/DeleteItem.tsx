"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { toast } from "../ui/use-toast";

interface DeleteItemProps {
  id: number;
  itemType: "news" | "guide" | "exchange" | "video" | "exclusive" | "podcast";
}

export default function DeleteItem({ id, itemType }: DeleteItemProps) {
  const deleteNewsMutation = api.news.deleteNews.useMutation();
  const deleteGuideMutation = api.guide.delete.useMutation();
  const deleteExchangeMutation = api.exchange.delete.useMutation();
  const deleteVideoMutation = api.video.deleteVideo.useMutation();
  const deleteExclusiveMutation = api.exclusive.delete.useMutation();
  const deletePodcastMutation = api.podcast.delete.useMutation();

  function deleteItemMutation() {
    switch (itemType) {
      case "news":
        deleteNewsMutation.mutate({ id });
        break;
      case "guide":
        deleteGuideMutation.mutate({ id });
        break;
      case "exchange":
        deleteExchangeMutation.mutate({ id });
        break;
      case "video":
        deleteVideoMutation.mutate({ id });
        break;
      case "exclusive":
        deleteExclusiveMutation.mutate({ id });
        break;
      case "podcast":
        deletePodcastMutation.mutate({ id });
        break;
      default:
        break;
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this and
            remove your data from the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteItemMutation();
              toast({ title: "Item deleted" });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
