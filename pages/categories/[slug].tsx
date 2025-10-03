import { useRouter } from "next/router";
import Link from "next/link";
import { PRODUCTS, CATEGORIES } from "../../data/products";
import { useEffect, useState } from "react";
import { useCart } from "../../components/CartContext";

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [items, setItems] = useState<typeof PRODUCTS>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!slug) return;
    const s = String(slug);
    const found = CATEGORIES.find(c => c.slug === s);
    setCategoryName(found ? found.name_ar : s);
    setItems(PRODUCTS.filter(p => p.category === s));
  }, [slug]);

  if (!slug) return null;

  return (
    <div style={{ padding: "60px 0", maxWidth: 1200, margin: "0 auto", direction: "rtl" }}>
      <h1 style={{ color: "#ff9800", fontWeight: "bold", fontSize: "2.3rem", textAlign: "center", marginBottom: 20 }}>
        {categoryName || "القسم"}
      </h1>

      {items.length === 0 ? (
        <div className="card" style={{ textAlign: "center" }}>
          لا توجد منتجات في هذا القسم حالياً.
          <div style={{ marginTop: 12 }}><Link href="/shop" className="btn btn-primary">عرض جميع المنتجات</Link></div>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px"
        }}>
          {items.map(p => (
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