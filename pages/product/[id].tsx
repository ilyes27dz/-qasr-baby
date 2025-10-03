import { useRouter } from "next/router";
import Link from "next/link";
import { useMemo } from "react";
import ProductCard from "../../components/ProductCard";
import { PRODUCTS } from "../../data/products";
import { useCart } from "../../components/CartContext";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();

  const product = useMemo(() => {
    if (!id) return null;
    return PRODUCTS.find(p => p.id === id) || null;
  }, [id]);

  if (!product) {
    return (
      <div style={{ padding: "60px 0", maxWidth: 900, margin: "0 auto", direction: "rtl" }}>
        <div className="card" style={{ textAlign: "center" }}>
          المنتج غير موجود.
          <div style={{ marginTop: 12 }}>
            <Link href="/shop" className="btn btn-primary">عرض المتجر</Link>
          </div>
        </div>
      </div>
    );
  }

  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div style={{ padding: "40px 0", maxWidth: 1100, margin: "0 auto", direction: "rtl" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24 }}>
        <div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 18, border: "1px solid #ffe0b2" }}>
            <img src={product.img} alt={product.name_ar} style={{ width: "100%", height: 420, objectFit: "cover", borderRadius: 12 }} />
            <h1 style={{ color: "#ff9800", marginTop: 12 }}>{product.name_ar}</h1>
            <div style={{ fontWeight: 800, color: "#2e7d32", fontSize: 20, margin: "10px 0" }}>{product.price.toLocaleString()} دج</div>
            <p style={{ color: "#444", lineHeight: 1.6 }}>{product.description || "وصف المنتج غير متوفر."}</p>
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <button onClick={() => addToCart({ id: product.id, name: product.name_ar, price: product.price })} className="btn btn-primary" style={{ padding: "12px 18px" }}>أضف إلى السلة</button>
              <Link href="/cart" className="btn btn-ghost" style={{ padding: "12px 18px", alignSelf: "center" }}>الذهاب إلى السلة</Link>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div className="card">
              <h3 style={{ marginBottom: 10, fontWeight: 800 }}>تفاصيل</h3>
              <div style={{ color: "#555" }}>{product.description || "لا توجد تفاصيل إضافية."}</div>
            </div>
          </div>
        </div>

        <aside>
          <div className="card" style={{ marginBottom: 12 }}>
            <div style={{ fontWeight: 800, marginBottom: 8 }}>ملخص</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>السعر</div>
              <div style={{ fontWeight: 800 }}>{product.price.toLocaleString()} دج</div>
            </div>
          </div>

          <div className="card">
            <div style={{ fontWeight: 800, marginBottom: 8 }}>منتجات ذات صلة</div>
            <div style={{ display: "grid", gap: 12 }}>
              {related.length === 0 ? <div>لا توجد منتجات ذات صلة.</div> :
                related.map(p => (
                  <ProductCard key={p.id} id={p.id} name_ar={p.name_ar} price={p.price} img={p.img} compact />
                ))
              }
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}