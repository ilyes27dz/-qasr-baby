import { useRef } from "react";

/*
  ملاحظة: ضع صور الشعارات في public/brands/ باسم مناسب (مثال: public/brands/hein.png).
  إذا لم تضعها سيعرض placeholder.
*/
const BRANDS = [
  "/brands/hein.png",
  "/brands/lenovo.png",
  "/brands/dell.png",
  "/brands/hp.png",
  "/brands/hipos.png",
];

export default function BrandsCarousel() {
  const ref = useRef<HTMLDivElement | null>(null);
  const scrollBy = (dir: "l" | "r") => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: dir === "l" ? -300 : 300, behavior: "smooth" });
  };

  return (
    <section className="brands container">
      <h2 className="section-title">علاماتنا التجارية</h2>
      <div className="brands-wrap">
        <button className="carousel-arrow left" onClick={() => scrollBy("l")}>‹</button>
        <div className="brands-track" ref={ref}>
          {BRANDS.map((b, i) => (
            <div className="brand-card" key={i}>
              <img src={b} alt={`brand-${i}`} onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://via.placeholder.com/180x80?text=Brand`; }} />
            </div>
          ))}
        </div>
        <button className="carousel-arrow right" onClick={() => scrollBy("r")}>›</button>
      </div>
    </section>
  );
}