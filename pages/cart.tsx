import Link from "next/link";
import { useCart } from "../components/CartContext";

export default function Cart() {
  const { items, cartCount, updateQty, removeFromCart, clearCart } = useCart();

  const total = items.reduce((s, it) => {
    // price may be string like "800 دج" - for demo we won't parse currency; replace with numeric price if available
    return s + (it.qty || 0);
  }, 0);

  return (
    <div style={{ padding: "60px 0", maxWidth: 900, margin: "0 auto", direction: "rtl" }}>
      <h1 style={{ color: "var(--accent)", fontWeight: "bold", fontSize: "2rem", textAlign: "center", marginBottom: 24 }}>السلة</h1>

      {(!items || items.length === 0) ? (
        <div className="card" style={{ textAlign: "center" }}>
          سلتك فارغة حالياً.
          <div style={{ marginTop: 12 }}>
            <Link href="/shop" className="btn btn-primary">ابدأ التسوق</Link>
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
          <div>
            {items.map(item => (
              <div key={item.id} className="card" style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700 }}>{item.name}</div>
                  <div style={{ color: "#777", marginTop: 6 }}>{item.price || ""}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ padding: "6px 10px" }}>−</button>
                  <div style={{ minWidth: 34, textAlign: "center", fontWeight: 700 }}>{item.qty}</div>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ padding: "6px 10px" }}>+</button>
                  <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: 8, padding: "6px 10px", background: "#eee", borderRadius: 6 }}>حذف</button>
                </div>
              </div>
            ))}
          </div>

          <aside className="card" style={{ height: "fit-content" }}>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 10 }}>ملخص الطلب</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div>عدد العناصر</div>
              <div>{cartCount}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
              <div>مجموع مؤقت</div>
              <div>{total} {/* استبدل هذا بحساب سعر حقيقي لاحقًا */}</div>
            </div>
            <Link href="/checkout" className="btn btn-primary" style={{ width: "100%", display: "inline-block", textAlign: "center", padding: "12px 0" }}>
              اتمام الشراء
            </Link>
            <button onClick={() => clearCart()} style={{ marginTop: 10, width: "100%", padding: "10px 0" }} className="btn btn-ghost">تفريغ السلة</button>
          </aside>
        </div>
      )}
    </div>
  );
}