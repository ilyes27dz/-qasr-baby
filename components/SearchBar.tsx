import React, { useEffect, useState } from "react";
import { products, Product } from "../data/products";
import Link from "next/link";

type Props = { onSelect?: (p: Product) => void };

export default function SearchBar({ onSelect }: Props) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [FuseClass, setFuseClass] = useState<any>(null);

  // حمّل المكتبة ديناميكياً على العميل فقط
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const mod = await import("fuse.js");
        if (mounted) setFuseClass(() => mod.default || mod);
      } catch (err) {
        console.error("Failed to load fuse.js", err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!q || !FuseClass) {
      setResults([]);
      return;
    }
    try {
      const fuse = new FuseClass(products, {
        keys: ["name", "category", "description"],
        threshold: 0.35,
      });
      const r = fuse.search(q).slice(0, 6).map((r: any) => r.item);
      setResults(r);
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    }
  }, [q, FuseClass]);

  return (
    <div style={{ position: "relative", minWidth: 220 }}>
      <input
        aria-label="بحث"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="ابحث عن منتج أو قسم..."
        style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #eee", width: 260 }}
      />
      {results.length > 0 && (
        <div style={{ position: "absolute", top: 44, right: 0, width: 320, background: "#fff", boxShadow: "0 6px 20px rgba(0,0,0,0.08)", borderRadius: 8, zIndex: 60 }}>
          {results.map(p => (
            <div key={p.id} style={{ padding: 10, borderBottom: "1px solid #f5f5f5", display: "flex", gap: 10, alignItems: "center" }}>
              <img src={p.img} alt={p.name} style={{ width: 56, height: 48, objectFit: "cover", borderRadius: 6 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{p.name}</div>
                <div style={{ color: "#666", fontSize: 13 }}>{p.category}</div>
              </div>
              <div>
                <Link href={`/product/${p.id}`} style={{ color: "var(--color-primary)", fontWeight: 700 }}>عرض</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}