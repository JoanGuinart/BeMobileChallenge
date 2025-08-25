import Image from "next/image";
import styles from "@styles/CharacterCard.module.scss";
import Heart from "@components/Heart";

interface CharacterCardProps {
  image: string;
  name: string;
  id: number;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ image, name, id }) => {
  return (
    <div data-testid="full-card" className={styles.card}>
      <a data-testid="card" href={`character/${id}`}>
        <Image
          priority
          src={image}
          alt=""
          width={190}
          height={190}
          style={{ height: "100%" }}
        />
      </a>
      <div>
        <p data-testid="card-title">{name}</p>
        <Heart id={id} heartClass={styles.heart} />
      </div>
    </div>
  );
};

export default CharacterCard;
