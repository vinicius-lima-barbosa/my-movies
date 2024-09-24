import connectMongoDB from "../../../lib/mongodb.js";
import Serie from "@/src/models/Serie.js";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const series = await Serie.find();
  return NextResponse.json({ series });
}

export async function POST(request) {
  try {
    // Extraindo os dados do corpo da requisição
    const {
      title,
      genre,
      isSeries,
      lastWatchedEpisode,
      totalEpisodes,
      completed,
      review,
    } = await request.json();

    // Validação básica de campos obrigatórios
    if (!title || !genre) {
      return NextResponse.json(
        { message: "Title and genre are required" },
        { status: 400 }
      );
    }

    // Conexão com o banco de dados
    await connectMongoDB();

    // Criação da série no banco de dados
    const newSerie = await Serie.create({
      title,
      genre,
      isSeries,
      lastWatchedEpisode: isSeries ? lastWatchedEpisode || 0 : 0,
      totalEpisodes: isSeries ? totalEpisodes || 0 : 0,
      completed,
      review: completed && review ? review : "",
    });

    // Resposta com a nova série criada
    return NextResponse.json(newSerie, { status: 201 });
  } catch (error) {
    console.error("Error creating series:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Serie.findByIdAndDelete(id);
  return NextResponse.json({ message: "Serie deleted" }, { status: 200 });
}
