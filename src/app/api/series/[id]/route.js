import connectMongoDB from "../../../../lib/mongodb.js";
import Serie from "@/src/models/Serie.js";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    title,
    genre,
    isSeries,
    lastWatchedEpisode,
    totalEpisodes,
    completed,
    review,
  } = await request.json();
  await connectMongoDB();
  await Serie.findByIdAndUpdate(
    id,
    {
      title,
      genre,
      isSeries,
      lastWatchedEpisode: isSeries ? lastWatchedEpisode : 0,
      totalEpisodes: isSeries ? totalEpisodes : 0,
      completed,
      review: completed && review ? review : "",
    },
    { new: true }
  );
  return NextResponse.json({ message: "Serie updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const serie = await Serie.findOne({ _id: id });
  return NextResponse.json({ serie }, { status: 200 });
}

export async function PATCH(request, { params }) {
  const { id } = params;
  await connectMongoDB();

  const updates = await request.json();

  const serie = await Serie.findById(id);

  if (!serie) {
    return NextResponse.json(
      { message: "Série não encontrada!" },
      { status: 404 }
    );
  }

  serie.title = updates.title !== undefined ? updates.title : serie.title;
  serie.genre = updates.genre !== undefined ? updates.genre : serie.genre;
  serie.isSeries =
    updates.isSeries !== undefined ? updates.isSeries : serie.isSeries;
  serie.lastWatchedEpisode =
    updates.lastWatchedEpisode !== undefined
      ? updates.lastWatchedEpisode
      : serie.lastWatchedEpisode;
  serie.totalEpisodes =
    updates.totalEpisodes !== undefined
      ? updates.totalEpisodes
      : serie.totalEpisodes;
  serie.completed =
    updates.completed !== undefined ? updates.completed : serie.completed;

  if (updates.completed) {
    serie.review = updates.review !== undefined ? updates.review : serie.review;
  }

  await serie.save();

  return NextResponse.json(serie, { status: 200 });
}
