import Link from "next/link";
import React from "react";
import { useCart } from "./CartContext";

type ProductProps = {
  id: string;
  name_ar: string;
  price: number;
  img?: string;
  description?: string;
  compact?: boolean;
};

export default function ProductCard({ id, name_ar, price, img, compact = false }: ProductProps) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({ id, name: name_ar, price });
  };

  if (compact) {
    return (
      <div style={{
        background: "#fff",
        borderRadius: 10,
        border: "1px solid #ffe0b2",
        padding: 10,
        textAlign: "center"
      }}>
        <Link href={`/product/${id}`} style={{ textDecoration: "none", color: "#222" }}>
          <img src={img} alt={name_ar} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8, marginBottom: 8 }} />
          <div style={{ fontWeight: 800, marginBottom: 6 }}>{name_ar}</div>
        </Link>
        <div style={{ color: "#2e7d32", fontWeight: 800, marginBottom: 8 }}>{price.toLocaleString()} دج</div>
        <button onClick={handleAdd} className="btn btn-primary" style={{ padding: "8px 12px" }}>أضف</button>
      </div>
    );
  }

  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      border: "1px solid #ffe0b2",
      padding: 14,
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      gap: 10
    }}>
      <Link href={`/product/${id}`} style={{ textDecoration: "none", color: "#222" }}>
        <img src={img} alt={name_ar} style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 10 }} />
        <div style={{ fontWeight: 800, fontSize: 16, marginTop: 8 }}>{name_ar}</div>
      </Link>
      <div style={{ color: "#2e7d32", fontWeight: 800, fontSize: 16 }}>{price.toLocaleString()} دج</div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        <button onClick={handleAdd} className="btn btn-primary" style={{ padding: "10px 16px" }}>أضف إلى السلة</button>
        <Link href={`/product/${id}`} className="btn btn-ghost" style={{ padding: "10px 16px", alignSelf: "center" }}>عرض</Link>
      </div>
    </div>
  );
}