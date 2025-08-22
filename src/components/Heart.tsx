"use client";
import React from "react";
import styles from "../styles/Heart.module.scss";
import { useFavorites } from "../context/FavoritesContext";

interface HeartProps {
  id: number;
  width?: number;
  height?: number;
  heartClass?: string;
}

const Heart: React.FC<HeartProps> = ({ id, width = 15, height = 14, heartClass }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const liked = favorites.includes(id);

  return (
    <svg
      className={`${styles.heart} ${liked ? styles.liked : ""}`}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
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
  );
};

export default Heart;
