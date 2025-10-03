import { CATEGORIES } from "../data/products";
import Link from "next/link";
import { useRef } from "react";

export default function CategoriesCarousel() {
  const ref = useRef<HTMLDivElement | null>(null);

  const scroll = (dir: "left" | "right") => {
    if (!ref.current) return;
    const w = ref.current.clientWidth;
    ref.current.scrollBy({ left: dir === "left" ? -w * 0.6 : w * 0.6, behavior: "smooth" });
  };

  return (
    <section className="categories container">
      <h2 className="section-title">تصفح حسب التصنيف</h2>
      <div className="carousel-wrap">
        <button className="carousel-arrow left" onClick={() => scroll("left")}>‹</button>
        <div className="carousel" ref={ref}>
          {CATEGORIES.map(c => (
            <Link key={c.slug} href={`/categories/${c.slug}`} className="category-card">
              <div className="category-icon">{c.name_ar[0]}</div>
              <div className="category-name">{c.name_ar}</div>
              <div className="category-count">منتجات</div>
            </Link>
          ))}
        </div>
        <button className="carousel-arrow right" onClick={() => scroll("right")}>›</button>
      </div>
    </section>
  );
}