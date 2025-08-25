// Comic.tsx
import Image from "next/image";
import React from "react";
import styles from "@styles/Comic.module.scss";

interface ComicProps {
  comic: {
    id: number;
    title: string;
    thumbnail: { path: string; extension: string };
    startYear?: number;
  };
}

const Comic: React.FC<ComicProps> = ({ comic }) => {
  const src = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
  const alt = comic.title;

  return (
    <div className={styles.comicCard}>
      <Image width={200} height={400} src={src} alt={alt} />
      <p>{comic.title}</p>
      {comic.startYear && <p>{comic.startYear}</p>}
    </div>
  );
};

export default Comic;
