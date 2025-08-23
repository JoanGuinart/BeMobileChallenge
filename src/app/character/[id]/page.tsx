import Heart from "@/components/Heart";
import { fetchMarvelCharacterById } from "@/lib/marvel";
import Image from "next/image";

export default async function CharacterPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await fetchMarvelCharacterById(params.id);
  const character = data.data.results[0];

  return (
    <main style={{ padding: "20px" }}>
      <h1>{character.name}</h1>
      <Image
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
        width={300}
        height={300}
      />
      <Heart id={character.id} />
      <p>{character.description || "No description available."}</p>
    </main>
  );
}
