import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  const ts = Date.now().toString();
  const privateKey = process.env.MARVEL_PRIVATE_KEY!;
  const publicKey = process.env.MARVEL_PUBLIC_KEY!;
  const hash = crypto
    .createHash("md5")
    .update(ts + privateKey + publicKey)
    .digest("hex");
  const limit = req.nextUrl.searchParams.get("limit") || "15";

  const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}`;

  const response = await fetch(url);
  const data = await response.json();

  return NextResponse.json(data);
}
