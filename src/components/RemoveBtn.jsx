"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }) {
  const router = useRouter();

  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");

    try {
      if (confirmed) {
        const response = await fetch(
          `http://localhost:3000/api/movies?id=${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          router.refresh();
        }
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <Button
      variant="destructive"
      onClick={removeTopic}
      size="icon"
      className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
