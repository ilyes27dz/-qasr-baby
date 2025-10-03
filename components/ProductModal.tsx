import React from "react";
import { Product } from "../data/products";
import { useCart } from "./CartContext";

type Props = {
  product: Product | null;
  onClose: () => void;
};

export default function ProductModal({ product, onClose }: Props) {
  const { addItem } = useCart();
  const [qty, setQty] = React.useState(1);

  if (!product) return null;

  const add = () => {
    addItem({ id: product.id, name: product.name, price: product.price, qty, img: product.img });
    onClose();
    // You can instead open confirm modal here
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200
    }} onClick={onClose}>
      <div style={{ width: "min(920px, 96%)", background: "#fff", borderRadius: 12, padding: 18 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
          <img src={product.img} alt={product.name} style={{ width: 420, maxWidth: "100%", borderRadius: 10 }} />
          <div style={{ flex: 1 }}>
            <h2 style={{ color: "var(--color-primary)", margin: 0 }}>{product.name}</h2>
            <p style={{ color: "#444" }}>{product.description}</p>
            <div style={{ fontWeight: 800, color: "var(--color-accent)", marginTop: 8 }}>{product.price.toLocaleString()} دج</div>

            <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}>
              <button className="btn btn-ghost" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <div>{qty}</div>
              <button className="btn btn-ghost" onClick={() => setQty(q => q + 1)}>+</button>
              <button className="btn btn-primary" onClick={add}>أضف إلى السلة</button>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 12, textAlign: "right" }}>
          <button onClick={onClose} className="btn" style={{ background: "#fafafa", borderRadius: 8 }}>إغلاق</button>
        </div>
      </div>
    </div>
  );
}