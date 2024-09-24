"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function EditCard({ serieId, initialData }) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [isSeries, setIsSeries] = useState(false);
  const [lastWatchedEpisode, setLastWatchedEpisode] = useState(0);
  const [totalEpisodes, setTotalEpisodes] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [review, setReview] = useState("");
  const router = useRouter();

  // Efeito para atualizar os estados quando os dados forem carregados
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.serie.title || "");
      setGenre(initialData.serie.genre || "");
      setIsSeries(initialData.serie.isSeries || false);
      setLastWatchedEpisode(initialData.serie.lastWatchedEpisode || 0);
      setTotalEpisodes(initialData.serie.totalEpisodes || 0);
      setIsCompleted(initialData.serie.completed || false);
      setReview(initialData.serie.review || "");
    }
  }, [initialData]);

  // Função para realizar o PATCH no backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/series/${serieId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            genre,
            isSeries,
            lastWatchedEpisode: isSeries ? lastWatchedEpisode : 0,
            totalEpisodes: isSeries ? totalEpisodes : 0,
            completed: isCompleted,
            review: isCompleted ? review : null,
          }),
        }
      );

      if (response.ok) {
        // Redirecionar após a atualização bem-sucedida
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

      {/* Checkbox para "É uma série?" */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="isSeries"
          checked={isSeries}
          onChange={(e) => setIsSeries(e.target.checked)}
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
              type="number"
              value={lastWatchedEpisode}
              onChange={(e) => setLastWatchedEpisode(e.target.value)}
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
              type="number"
              value={totalEpisodes}
              onChange={(e) => setTotalEpisodes(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Total de episódios da série"
            />
          </div>
        </>
      )}

      {/* Checkbox para "Já finalizado?" */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="completed"
          checked={isCompleted}
          onChange={(e) => setIsCompleted(e.target.checked)}
          className="mr-2"
        />
        <Label
          htmlFor="completed"
          className="text-sm font-medium text-gray-700"
        >
          Já finalizado?
        </Label>
      </div>

      {/* Exibição condicional do campo "Avaliação" */}
      {isCompleted && (
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
      )}

      {/* Botões de Ação */}
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
