import crypto from "crypto";

export async function fetchMarvelCharacters(limit: number = 15) {
  const ts = Date.now().toString();
  const privateKey = process.env.MARVEL_PRIVATE_KEY!;
  const publicKey = process.env.MARVEL_PUBLIC_KEY!;

  const hash = crypto
    .createHash("md5")
    .update(ts + privateKey + publicKey)
    .digest("hex");

  const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch Marvel API");
  return res.json();
}
