import { NextResponse } from "next/server";
import { getAuthParams } from "@/lib/marvel";

interface MarvelComic {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  dates: {
    type: string;
    date: string;
  }[];
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const characterId = url.searchParams.get("characterId");
  if (!characterId) return NextResponse.json({ data: { results: [] } });

  try {
    const { ts, apikey, hash } = getAuthParams();
    const marvelUrl = `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?ts=${ts}&apikey=${apikey}&hash=${hash}&limit=20&orderBy=-onsaleDate`;
    const res = await fetch(marvelUrl);
    if (!res.ok) throw new Error("Failed to fetch comics");

    const data = await res.json();

    const getReleaseYear = (dates: MarvelComic["dates"]) => {
      const onsaleDateObject = dates.find((d) => d.type === "onsaleDate");
      if (onsaleDateObject) {
        return new Date(onsaleDateObject.date).getFullYear();
      }
      return null;
    };
    const simplified = data.data.results.map((comic: MarvelComic) => ({
      id: comic.id,
      title: comic.title,
      thumbnail: comic.thumbnail,
      startYear: getReleaseYear(comic.dates),
    }));

    return NextResponse.json({ data: { results: simplified } });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch comics" },
      { status: 500 }
    );
  }
}
