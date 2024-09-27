"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function Post() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [review, setReview] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !genre || !review) {
      alert("Title and genre are required!");
      return;
    }

    const data = {
      title,
      genre,
      review,
    };

    try {
      const response = await fetch("http://localhost:3000/api/movies", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/");
        router.refresh();
      } else {
        throw new Error("Failed to create!");
      }
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 shadow-lg rounded-lg max-w-md mx-auto"
    >
      <div>
        <Label
          htmlFor="titulo"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </Label>
        <Input
          id="titulo"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <Label
          htmlFor="genero"
          className="block text-sm font-medium text-gray-700"
        >
          Genre
        </Label>
        <Input
          id="genero"
          onChange={(e) => setGenre(e.target.value)}
          value={genre}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <Label
          htmlFor="review"
          className="block text-sm font-medium text-gray-700"
        >
          Review
        </Label>
        <Input
          id="review"
          onChange={(e) => setReview(e.target.value)}
          value={review}
          type="text"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Escreva sua crítica sobre o filme ou série"
        />
      </div>

      <div className="flex justify-between">
        <Link href="/">
          <Button
            variant="outline"
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-0"
          >
            Cancel
          </Button>
        </Link>
        <Button
          type="submit"
          className="py-2 px-4 bg-primary text-white rounded-md shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-0"
        >
          Post
        </Button>
      </div>
    </form>
  );
}
