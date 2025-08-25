"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "@styles/ComicsSection.module.scss";
import Comic from "@components/Comic";

interface Comic {
  id: number;
  title: string;
  thumbnail: { path: string; extension: string };
  startYear?: number;
}

interface ComicsSectionProps {
  characterId: number;
}

const ComicsSection: React.FC<ComicsSectionProps> = ({ characterId }) => {
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const momentumId = useRef<number | null>(null);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const res = await fetch(`/api/comics?characterId=${characterId}`);
        if (!res.ok) throw new Error("Failed to fetch comics");
        const data = await res.json();
        setComics(data.data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchComics();
  }, [characterId]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const percent = (scrollLeft / (scrollWidth - clientWidth)) * 100;
    setScrollPercent(percent);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    e.preventDefault();
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = "grabbing";
    lastX.current = e.pageX;
    if (momentumId.current) {
      cancelAnimationFrame(momentumId.current);
      momentumId.current = null;
    }
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !scrollRef.current) return;
      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX.current) * .5;
      scrollRef.current.scrollLeft = scrollLeft.current - walk;
      handleScroll();
      velocity.current = e.pageX - lastX.current;
      lastX.current = e.pageX;
    };
    const handleMouseUp = () => {
      isDragging.current = false;
      if (scrollRef.current) scrollRef.current.style.cursor = "grab";
      const decay = 0.95;
      const step = () => {
        if (!scrollRef.current) return;

        const bar = document.querySelector(
          `.${styles.scrollBar}`
        ) as HTMLDivElement;
        if (bar) bar.style.transition = "none";

        scrollRef.current.scrollLeft -= velocity.current;
        handleScroll();
        velocity.current *= decay;

        if (Math.abs(velocity.current) > 0.5) {
          momentumId.current = requestAnimationFrame(step);
        } else {
          momentumId.current = null;
          if (bar) bar.style.transition = "width 0.3s ease-out";
        }
      };

      momentumId.current = requestAnimationFrame(step);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  if (loading) return <p>Loading comics...</p>;
  if (comics.length === 0) return <p>No comics found.</p>;

  return (
    <section className={styles.comicsSection}>
      <h2>Comics</h2>
      <div
        ref={scrollRef}
        className={styles.comicsList}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        style={{
          overflowX: "auto",
          cursor: "grab",
          scrollbarWidth: "none",
        }}
      >
        {comics.map((comic) => (
          <Comic key={comic.id} comic={comic} />
        ))}
      </div>
      <div className={styles.scrollBarWrapper}>
        <div
          className={styles.scrollBar}
          style={{
            width: `${scrollPercent}%`,
            transition: "width 0.3s ease-out",
          }}
        />
      </div>
    </section>
  );
};

export default ComicsSection;
