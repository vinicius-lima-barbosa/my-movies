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
  const [isSeries, setIsSeries] = useState(false);
  const [lastWatchedEpisode, setLastWatchedEpisode] = useState(0);
  const [totalEpisodes, setTotalEpisodes] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [review, setReview] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !genre) {
      alert("Title and genre are required!");
      return;
    }

    const data = {
      title,
      genre,
      isSeries,
      completed,
    };

    // Apenas inclui os campos se for uma série
    if (isSeries) {
      data.lastWatchedEpisode = lastWatchedEpisode;
      data.totalEpisodes = totalEpisodes;
    }

    // Apenas inclui o campo review se a série/filme for finalizado
    if (completed) {
      data.completed = completed;
      data.review = review;
    }

    try {
      const response = await fetch("http://localhost:3000/api/series", {
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
          Título
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
          Gênero
        </Label>
        <Input
          id="genero"
          onChange={(e) => setGenre(e.target.value)}
          value={genre}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isSeries"
          onChange={(e) => setIsSeries(e.target.checked)}
          checked={isSeries}
          className="mr-2"
        />
        <Label htmlFor="isSeries" className="text-sm font-medium text-gray-700">
          É uma série?
        </Label>
      </div>

      {isSeries && (
        <>
          <div>
            <Label
              htmlFor="lastWatchedEpisode"
              className="block text-sm font-medium text-gray-700"
            >
              Último Episódio Assistido
            </Label>
            <Input
              id="lastWatchedEpisode"
              onChange={(e) => setLastWatchedEpisode(Number(e.target.value))}
              value={lastWatchedEpisode}
              type="number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Número do último episódio assistido"
            />
          </div>

          <div>
            <Label
              htmlFor="totalEpisodes"
              className="block text-sm font-medium text-gray-700"
            >
              Total de Episódios
            </Label>
            <Input
              id="totalEpisodes"
              onChange={(e) => setTotalEpisodes(Number(e.target.value))}
              value={totalEpisodes}
              type="number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Total de episódios da série"
            />
          </div>
        </>
      )}

      <div className="flex items-center">
        <input
          type="checkbox"
          id="completed"
          onChange={(e) => setCompleted(e.target.checked)}
          checked={completed}
          className="mr-2"
        />
        <Label
          htmlFor="completed"
          className="text-sm font-medium text-gray-700"
        >
          Já finalizado?
        </Label>
      </div>

      {completed && (
        <div>
          <Label
            htmlFor="review"
            className="block text-sm font-medium text-gray-700"
          >
            Avaliação
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
      )}

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
