import connectMongoDB from "../../../lib/mongodb.js";
import Movie from "@/src/models/Movie.js";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const movies = await Movie.find();
    return NextResponse.json({ movies });
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json(
      { message: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { poster, title, genre, review } = await request.json();

    if (!poster || !title || !genre || !review) {
      return NextResponse.json(
        { message: "The poster, title, genre and review are required" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const newMovie = await Movie.create({
      poster,
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
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Movie ID is required" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const deletedMovie = await Movie.findByIdAndDelete(id);

    if (!deletedMovie) {
      return NextResponse.json({ message: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Movie deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting movie:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
