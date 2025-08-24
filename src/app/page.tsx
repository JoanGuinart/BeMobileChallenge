import { fetchMarvelCharacters } from "@/lib/marvel";
import CharactersWithSearch from "@/components/CharactersWithSearch";

export default async function Home() {
  const data = await fetchMarvelCharacters(50);
  const characters = data.data.results;

  return (
    <main>
      <CharactersWithSearch initialCharacters={characters} />
    </main>
  );
}
