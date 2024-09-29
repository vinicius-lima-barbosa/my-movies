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
import Image from "next/image";

const getMoviesData = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/movies", {
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

export default async function MoviesList() {
  const moviesData = await getMoviesData();

  if (!moviesData || !moviesData.movies) {
    return <p>Error while rendering data</p>;
  }

  return (
    <>
      <div className="mb-6 flex justify-between items-center ">
        <h2 className="text-xl font-semibold">Movies List</h2>
        <Link href="/post">
          <Button className="flex bg-black text-white hover:bg-zinc-800">
            <PlusCircle className="mr-2 h-4 w-4" /> Post New
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {moviesData.movies.map((t) => (
          <Card
            key={t._id}
            className="p-4 border border-slate-300 my-3 rounded-lg shadow-sm justify-between"
          >
            <CardHeader className="flex-row mb-3">
              <Image
                src="https://static.wikia.nocookie.net/starwars/images/f/f7/SWEpisodeVTheEmpireStrikesBack-MarvelHC.jpg"
                alt="Uploaded Poster"
                width={120}
                height={60}
                className="rounded-md shadow-lg"
              />
              <CardTitle className="ml-3">
                <p className="font-bold text-2xl">{t.title}</p>
                <p className="text-sm text-gray-600">{t.genre}</p>
              </CardTitle>
            </CardHeader>

            <CardContent className="mb-2">
              <p className="text-gray-800 text-justify">Review: {t.review}</p>
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
