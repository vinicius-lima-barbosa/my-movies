import connectMongoDB from "../../../../lib/mongodb.js";
import Movie from "@/src/models/Movie.js";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { poster, title, genre, review } = await request.json();
  await connectMongoDB();
  await Movie.findByIdAndUpdate(
    id,
    {
      poster,
      title,
      genre,
      review,
    },
    { new: true }
  );
  return NextResponse.json({ message: "Movie updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const movie = await Movie.findOne({ _id: id });
  return NextResponse.json({ movie }, { status: 200 });
}

export async function PATCH(request, { params }) {
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
}
