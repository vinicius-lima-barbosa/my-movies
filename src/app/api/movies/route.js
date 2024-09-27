import connectMongoDB from "../../../lib/mongodb.js";
import Movie from "@/src/models/Movie.js";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const movies = await Movie.find();
  return NextResponse.json({ movies });
}

export async function POST(request) {
  try {
    const { title, genre, review } = await request.json();

    if (!title || !genre || !review) {
      return NextResponse.json(
        { message: "Title, genre and review are required" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const newMovie = await Movie.create({
      title,
      genre,
      review,
    });

    return NextResponse.json(newMovie, { status: 201 });
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
  await Movie.findByIdAndDelete(id);
  return NextResponse.json({ message: "Movie deleted" }, { status: 200 });
}
