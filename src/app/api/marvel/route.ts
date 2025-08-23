import { NextResponse } from "next/server";
import {
  fetchMarvelCharacters,
  fetchMarvelCharactersByIds,
} from "@/lib/marvel";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const idsParam = url.searchParams.get("ids");
  const limit = parseInt(url.searchParams.get("limit") || "50", 10);
  const search = url.searchParams.get("search") || undefined;

  try {
    if (idsParam) {
      const ids = idsParam
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      if (ids.length === 0) return NextResponse.json({ data: { results: [] } });
      const characters = await fetchMarvelCharactersByIds(ids);
      return NextResponse.json({ data: { results: characters } });
    }
    const data = await fetchMarvelCharacters(limit, search);
    return NextResponse.json(data);
  } catch (err) {
    console.error("API error", err);
    return NextResponse.json(
      { error: "Failed to fetch Marvel API" },
      { status: 500 }
    );
  }
}
