import { fetchMarvelCharacters } from "@/lib/marvel";
import styles from "../styles/Home.module.scss";
import CharactersWithSearch from "@/components/CharactersWithSearch";

export default async function Home() {
  const data = await fetchMarvelCharacters(15);
  const characters = data.data.results;

  return (
    <main className={styles.main}>
      <CharactersWithSearch characters={characters} />
    </main>
  );
}
