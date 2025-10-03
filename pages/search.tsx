import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PRODUCTS } from "../data/products";
import Link from "next/link";
import { useCart } from "../components/CartContext";

export default function SearchPage() {
  const router = useRouter();
  const q = typeof router.query.q === "string" ? router.query.q.trim() : "";
  const [results, setResults] = useState<typeof PRODUCTS>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const term = (q || "").toLowerCase();
    if (!term) {
      setResults(PRODUCTS);
      return;
    }
    setResults(PRODUCTS.filter(p => p.name_ar.toLowerCase().includes(term)));
  }, [q]);

  return (
    <div style={{ padding: "60px 0", maxWidth: 1200, margin: "0 auto", direction: "rtl" }}>
      <h1 style={{ color: "#ff9800", fontWeight: "bold", fontSize: "2rem", marginBottom: 18 }}>
        نتائج البحث عن: «{q || "جميع المنتجات"}»
      </h1>

      {results.length === 0 ? (
        <div className="card" style={{ textAlign: "center" }}>لم نَجِد نتائج</div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px"
        }}>
          {results.map(p => (
            <div key={p.id} className="card" style={{ textAlign: "center", padding: 12 }}>
              <img src={p.img} alt={p.name_ar} style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 8, marginBottom: 8 }} />
              <div style={{ fontWeight: 800 }}>{p.name_ar}</div>
              <div style={{ color: "#2e7d32", fontWeight: 700, marginBottom: 8 }}>{p.price.toLocaleString()} دج</div>
              <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                <button onClick={() => addToCart({ id: p.id, name: p.name_ar, price: p.price })} className="btn btn-primary">أضف إلى السلة</button>
                <Link href={`/product/${p.id}`} className="btn btn-ghost">عرض</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}