import { PRODUCTS } from "../data/products";
import { useCart } from "../components/CartContext";

export default function Shop() {
  const { addToCart } = useCart();

  return (
    <div style={{ padding: "60px 0", maxWidth: 1200, margin: "0 auto", direction: "rtl" }}>
      <h1 style={{ color: "#ff9800", fontWeight: "bold", fontSize: "2.3rem", textAlign: "center", marginBottom: 30 }}>
        منتجاتنا
      </h1>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "28px",
        marginTop: "32px"
      }}>
        {PRODUCTS.map(p => (
          <div key={p.id} style={{
            background: "#fff",
            borderRadius: 13,
            boxShadow: "0 2px 8px #ff980022",
            padding: "13px 15px",
            textAlign: "center",
            border: "2px solid #fffde4",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            position: "relative"
          }}>
            <div style={{
              position: "absolute",
              right: 12,
              top: 12,
              background: "#ff5252",
              color: "#fff",
              padding: "6px 10px",
              borderRadius: 8,
              fontWeight: 800,
              fontSize: 13,
              boxShadow: "0 6px 18px rgba(255,82,82,0.12)"
            }}>اطلب الآن</div>

            <div style={{
              position: "absolute",
              left: 12,
              top: 12,
              background: "#fffde4",
              color: "#ff9800",
              padding: "4px 8px",
              borderRadius: 8,
              fontWeight: 800,
              fontSize: 12,
              border: "1px solid #ffe0b2"
            }}>الدفع عند الاستلام 😍</div>

            <img src={p.img} alt={p.name_ar} style={{ width: "140px", height: "110px", objectFit: "cover", marginBottom: 8, borderRadius: 12 }} />
            <div style={{ fontWeight: 700, fontSize: 18, color: "#222" }}>{p.name_ar}</div>
            <div style={{ fontWeight: 700, color: "#2e7d32", fontSize: 18 }}>{p.price.toLocaleString()} دج</div>
            <button onClick={() => addToCart({ id: p.id, name: p.name_ar, price: p.price })} style={{
              background: "linear-gradient(90deg,#ff9800 40%,#81c784 100%)",
              color: "#fff",
              padding: "8px 24px",
              borderRadius: 9,
              fontWeight: 700,
              fontSize: "1rem",
              border: "none",
              marginTop: 10,
              cursor: "pointer"
            }}>
              أضف إلى السلة
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}