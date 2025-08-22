import { NextResponse } from "next/server";
import { fetchMarvelCharacters } from "@/lib/marvel";

export async function GET(req: Request) {
  const limit = parseInt(
    new URL(req.url).searchParams.get("limit") || "15",
    10
  );
  const data = await fetchMarvelCharacters(limit);
  return NextResponse.json(data);
}
