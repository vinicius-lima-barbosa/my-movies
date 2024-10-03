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
  const [posterURL, setPosterURL] = useState("");

  const router = useRouter();

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidURL(posterURL)) {
      alert("Please enter a valid URL for the poster.");
      return;
    }

    if (!posterURL | !title || !genre || !review) {
      alert("Title and genre are required!");
      return;
    }

    const data = {
      poster: posterURL,
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
          htmlFor="poster"
          className="block text-sm font-medium text-gray-700"
        >
          Poster
        </Label>
        <Input
          id="poster"
          onChange={(e) => setPosterURL(e.target.value)}
          value={posterURL}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Type the URL for the movie poster"
        />
      </div>

      <div>
        <Label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </Label>
        <Input
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Type the movie title"
        />
      </div>

      <div>
        <Label
          htmlFor="genre"
          className="block text-sm font-medium text-gray-700"
        >
          Genre
        </Label>
        <Input
          id="genre"
          onChange={(e) => setGenre(e.target.value)}
          value={genre}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Type the movie genre(s)"
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
          placeholder="Type your review"
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
