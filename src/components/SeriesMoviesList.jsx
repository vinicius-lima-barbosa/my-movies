import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import RemoveBtn from "./RemoveBtn";

const getSeriesMoviesData = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/series", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch!");
    }

    return response.json();
  } catch (err) {
    console.log(`Erro: ${err}`);
  }
};

export default async function SeriesMoviesList() {
  const seriesMoviesData = await getSeriesMoviesData();

  if (!seriesMoviesData || !seriesMoviesData.series) {
    return <p>Erro ao carregar os dados ou sem dados disponíveis</p>;
  }

  return (
    <>
      <div className="mb-6 flex justify-between items-center ">
        <h2 className="text-xl font-semibold">Lista de Filmes e Séries</h2>
        <Link href="/post">
          <Button className="flex bg-black text-white hover:bg-zinc-800">
            <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Novo
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {seriesMoviesData.series.map((t) => (
          <Card
            key={t._id}
            className="p-4 border border-slate-300 my-3 rounded-lg shadow-sm flex flex-col justify-between"
          >
            <CardHeader>
              <CardTitle className="text-xl font-bold mb-2">
                {t.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-600">Gênero: {t.genre}</p>
              {t.isSeries && (
                <p className="text-sm text-gray-600">
                  Episódios assistidos: {t.lastWatchedEpisode}/{t.totalEpisodes}
                </p>
              )}
              {t.completed && (
                <>
                  <p className="text-sm text-green-600">
                    <span className="text-gray-600">Status:</span> Concluído
                  </p>
                  <p className="text-sm text-gray-600">Avaliação: {t.review}</p>
                </>
              )}
            </CardContent>
            <CardFooter className="flex justify-between mt-2">
              <Link href={`/edit/${t._id}`}>
                <Button
                  variant="outline"
                  size="icon"
                  className="border border-gray-400 hover:bg-gray-100 p-3 rounded-lg"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </Button>
              </Link>
              <RemoveBtn id={t._id} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
