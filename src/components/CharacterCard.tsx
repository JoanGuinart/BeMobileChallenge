import Image from "next/image";
import React from "react";
import styles from "../styles/CharacterCard.module.scss";

interface CharacterCardProps {
  image: string;
  name: string;
  id: number;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ image, name, id }) => {
  return (
    <a href={`character/${id}`} className={styles.card}>
      <Image src={image} alt="" width={190} height={190} />
      <div>
        <p>{name}</p>
        <svg
          width="13"
          height="12"
          viewBox="0 0 13 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.57141 2.37318L3.57141 0.552368L0.571411 2.37318V6.27491L6.57141 11.3905L12.5714 6.27491V2.37318L9.57141 0.552368L6.57141 2.37318Z"
            fill="var(--marvel-red)"
          />
        </svg>
      </div>
    </a>
  );
};

export default CharacterCard;
