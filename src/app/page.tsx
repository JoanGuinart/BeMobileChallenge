import styles from "../styles/Home.module.scss";
import CharactersWithSearch from "@/components/CharactersWithSearch";

export default async function Home() {
  const limit = 15;

  // Detecta si estamos en Vercel o en local
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/marvel?limit=${limit}`);
  const data = await res.json();
  const characters = data.data.results;

  return (
    <main className={styles.main}>
      <CharactersWithSearch characters={characters} />
    </main>
  );
}
