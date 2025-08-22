import Image from "next/image";
import styles from "../styles/CharacterCard.module.scss";
import Heart from "./Heart";

interface CharacterCardProps {
  image: string;
  name: string;
  id: number;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ image, name, id }) => {
  return (
    <div className={styles.card}>
      <a href={`character/${id}`}>
        <Image src={image} alt="" width={190} height={190} style={{height: '100%'}}/>
      </a>
      <div>
        <p>{name}</p>
        <Heart id={id} heartClass={styles.heart} />
      </div>
    </div>
  );
};

export default CharacterCard;
