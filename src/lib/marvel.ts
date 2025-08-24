import crypto from "crypto";

export function getAuthParams() {
  const ts = Date.now().toString();
  const privateKey = process.env.MARVEL_PRIVATE_KEY!;
  const publicKey = process.env.MARVEL_PUBLIC_KEY!;
  const hash = crypto
    .createHash("md5")
    .update(ts + privateKey + publicKey)
    .digest("hex");

  return { ts, apikey: publicKey, hash };
}

export async function fetchMarvelCharacters(
  limit: number = 50,
  search?: string
) {
  const { ts, apikey, hash } = getAuthParams();

  let url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${apikey}&hash=${hash}&limit=${limit}`;

  if (search) {
    url += `&nameStartsWith=${encodeURIComponent(search)}`;
  }

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch Marvel API");
  return res.json();
}

export async function fetchMarvelCharacterById(id: string) {
  const { ts, apikey, hash } = getAuthParams();
  const url = `https://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${apikey}&hash=${hash}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch Marvel API");
  return res.json();
}

export async function fetchMarvelCharactersByIds(ids: string[]) {
  const results = await Promise.all(
    ids.map((id) => fetchMarvelCharacterById(id).then((r) => r.data.results[0]))
  );
  return results.filter(Boolean);
}
