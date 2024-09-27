"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function EditCard({ movieID, initialData }) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [review, setReview] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.movie.title);
      setGenre(initialData.movie.genre);
      setReview(initialData.movie.review);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/movies/${movieID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            genre,
            review,
          }),
        }
      );

      if (response.ok) {
        router.push("/");
        router.refresh();
      } else {
        console.error("Erro ao atualizar a série");
      }
    } catch (error) {
      console.error("Erro ao realizar o PATCH", error);
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
          Título
        </Label>
        <Input
          id="titulo"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <Label
          htmlFor="genero"
          className="block text-sm font-medium text-gray-700"
        >
          Gênero
        </Label>
        <Input
          id="genero"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <Label
          htmlFor="review"
          className="block text-sm font-medium text-gray-700"
        >
          Avaliação
        </Label>
        <Input
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
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
            Cancelar
          </Button>
        </Link>
        <Button
          type="submit"
          className="py-2 px-4 bg-primary text-white rounded-md shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-0"
        >
          Salvar
        </Button>
      </div>
    </form>
  );
}
