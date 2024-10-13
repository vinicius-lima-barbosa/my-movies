import connectMongoDB from "../../../../lib/mongodb.js";
import Movie from "@/src/models/Movie.js";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { poster, title, genre, review } = await request.json();

    if (!poster || !title || !genre || !review) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { poster, title, genre, review },
      { new: true }
    );

    if (!updatedMovie) {
      return NextResponse.json({ message: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Movie updated" }, { status: 200 });
  } catch (error) {
    console.error("Error updating movie:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();

    const movie = await Movie.findOne({ _id: id });

    if (!movie) {
      return NextResponse.json({ message: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json({ movie }, { status: 200 });
  } catch (error) {
    console.error("Error fetching movie:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();

    const updates = await request.json();
    const movie = await Movie.findById(id);

    if (!movie) {
      return NextResponse.json({ message: "Movie not found" }, { status: 404 });
    }

    movie.poster = updates.poster !== undefined ? updates.poster : movie.poster;
    movie.title = updates.title !== undefined ? updates.title : movie.title;
    movie.genre = updates.genre !== undefined ? updates.genre : movie.genre;
    movie.review = updates.review !== undefined ? updates.review : movie.review;

    await movie.save();

    return NextResponse.json(movie, { status: 200 });
  } catch (error) {
    console.error("Error updating movie with PATCH:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
