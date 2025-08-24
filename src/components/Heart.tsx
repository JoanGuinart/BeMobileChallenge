"use client";
import React from "react";
import styles from "../styles/Heart.module.scss";
import { useFavorites } from "../context/FavoritesContext";

interface HeartProps {
  id: number;
  heartClass?: string;
  isBig?: boolean;
}

const Heart: React.FC<HeartProps> = ({ id, heartClass, isBig = false }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const liked = favorites.includes(id);

  return (
    <>
      {isBig ? (
        <svg
          className={`${styles.heart} ${liked ? styles.liked : ""}`}
          width="24"
          height="22"
          viewBox="0 0 24 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => toggleFavorite(id)}
        >
          <g transform="translate(1 1) scale(0.9166667)">
            <path
              className={liked ? heartClass : ""}
              d="M12 3.81227L6 0.170654L0 3.81227V11.6157L12 21.847L24 11.6157V3.81227L18 0.170654L12 3.81227Z"
              stroke="#fff"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </svg>
      ) : (
        <svg
          className={`${styles.heart} ${liked ? styles.liked : ""}`}
          width="15"
          height="14"
          viewBox="0 0 15 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => toggleFavorite(id)}
        >
          <path
            className={liked ? heartClass : ""}
            d="M6.71448 2.37318L3.71448 0.552368L0.714478 2.37318V6.27491L6.71448 11.3905L12.7145 6.27491V2.37318L9.71448 0.552368L6.71448 2.37318Z"
            stroke="#fff"
            strokeWidth="2"
          />
        </svg>
      )}
    </>
  );
};

export default Heart;
