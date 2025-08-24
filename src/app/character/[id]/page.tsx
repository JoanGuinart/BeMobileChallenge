import SingleCharacterPage from "../../../components/SingleCharacterPage";
import { fetchMarvelCharacterById } from "@/lib/marvel";
import { notFound } from "next/navigation";

type ParamsType = { id: string } | Promise<{ id: string }>;

export default async function Page({ params }: { params: ParamsType }) {
  const { id } = await params;
  const data = await fetchMarvelCharacterById(id);
  const character = data?.data?.results?.[0];

  if (!character) {
    return notFound();
  }

  const characterProps = {
    id: character.id,
    name: character.name,
    description: character.description ?? "Description not available",
    thumbnailPath: character.thumbnail.path,
    thumbnailExt: character.thumbnail.extension,
  };

  return (
    <main>
      <SingleCharacterPage character={characterProps} />
    </main>
  );
}
