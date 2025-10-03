import Link from "next/link";
import { CATEGORIES } from "../data/products";

export default function CategoriesPage() {
  return (
    <div style={{ padding: "60px 0", maxWidth: 1200, margin: "0 auto", direction: "rtl" }}>
      <h1 style={{ color: "#ff9800", fontWeight: "bold", fontSize: "2.3rem", textAlign: "center", marginBottom: 30 }}>
        الأقسام
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 20
      }}>
        {CATEGORIES.map(cat => (
          <Link key={cat.slug} href={`/categories/${cat.slug}`} style={{
            background: "#fff",
            borderRadius: 12,
            padding: 18,
            textAlign: "center",
            textDecoration: "none",
            color: "#222",
            boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
            border: "1px solid #ffe0b2",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            alignItems: "center"
          }}>
            <div style={{ width: 72, height: 72, borderRadius: 12, background: "#fffde4", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>
              {cat.name_ar[0]}
            </div>
            <div style={{ fontWeight: 800 }}>{cat.name_ar}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}