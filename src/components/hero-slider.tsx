import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { IconArrowRight } from "@/components/icons";
import type { AnalisisItem } from "@/lib/content";
import { formatIdDate } from "@/lib/format";
import { cn } from "@/lib/utils";

const ACCENT = {
  blue: "",
  orange: "badge-orange",
  green: "badge-green",
  red: "badge-red",
} as const;

export function HeroSlider({ items }: { items: AnalisisItem[] }) {
  const slides = items.slice(0, 4);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => {
      if (slides.length === 0) return;
      setIndex((next + slides.length) % slides.length);
    },
    [slides.length],
  );

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const id = window.setInterval(() => go(index + 1), 5600);
    return () => window.clearInterval(id);
  }, [go, index, paused, slides.length]);

  if (slides.length === 0) return null;
  const current = slides[index];

  return (
    <div
      className="hero-slider enter-up"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchX.current = e.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const start = touchX.current;
        const end = e.changedTouches[0]?.clientX;
        touchX.current = null;
        if (start == null || end == null) return;
        const delta = end - start;
        if (delta > 40) go(index - 1);
        if (delta < -40) go(index + 1);
      }}
    >
      <div className="hero-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((item, i) => (
          <article key={item.slug} className="hero-slide" aria-hidden={i !== index}>
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt=""
                draggable={false}
                loading={i === 0 ? "eager" : "lazy"}
              />
            ) : null}
            <div className="hero-slide-veil" />
            <div className="hero-slide-copy">
              <span className={cn("badge w-fit", ACCENT[item.accent])}>{item.pair}</span>
              <p className="mt-3 text-xs tracking-wide text-subtle uppercase">
                {formatIdDate(item.publishedAt)}
              </p>
              <h2 className="mt-2 text-3xl leading-tight font-extrabold tracking-tight max-md:text-2xl">
                {item.title}
              </h2>
              <p className="mt-3 max-w-md text-sm text-muted">{item.excerpt}</p>
              <Link
                to="/analisis/$slug"
                params={{ slug: item.slug }}
                className="btn btn-primary mt-6 w-fit"
              >
                Baca Analisis <IconArrowRight size={15} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {slides.length > 1 ? (
        <>
          <button type="button" className="hero-nav-btn prev" aria-label="Slide sebelumnya" onClick={() => go(index - 1)}>
            <span className="inline-block rotate-180">
              <IconArrowRight size={16} />
            </span>
          </button>
          <button type="button" className="hero-nav-btn next" aria-label="Slide berikutnya" onClick={() => go(index + 1)}>
            <IconArrowRight size={16} />
          </button>
          <div className="hero-dots" role="tablist" aria-label="Pilih analisis">
            {slides.map((item, i) => (
              <button
                key={item.slug}
                type="button"
                className={cn("hero-dot", i === index && "is-active")}
                aria-label={`Slide ${i + 1}: ${item.pair}`}
                aria-current={i === index}
                onClick={() => go(i)}
              />
            ))}
          </div>
        </>
      ) : null}

      <span className="sr-only" aria-live="polite">
        {current?.title}
      </span>
    </div>
  );
}
