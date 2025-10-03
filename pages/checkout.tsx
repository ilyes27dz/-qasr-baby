import Link from "next/link";
import { useMemo } from "react";
import { useCart } from "../components/CartContext";

function parsePrice(price?: string | number): number {
  // تقبل price كرقم أو كنص مثل "800 دج" أو "1,200.50"
  if (price == null) return 0;
  if (typeof price === "number") return isFinite(price) ? price : 0;
  // احذف أي حرف غير رقم أو فاصلة أو نقطة ثم حاول تحويله إلى رقم
  const cleaned = String(price).replace(/[^\d.,-]/g, "").trim();
  if (!cleaned) return 0;
  // إذا يوجد فاصلة عشرية على شكل "1.234,56" أو "1,234.56" قد نحتاج تحسين؛ نجرّب أبسط نهج:
  // إذا يحتوي على ',' و '.' معًا نفترض أن الفاصلة الأخيرة هي العشرية
  if (cleaned.includes(",") && cleaned.includes(".")) {
    const lastDot = cleaned.lastIndexOf(".");
    const lastComma = cleaned.lastIndexOf(",");
    // اعتبر الحرف الذي يأتي لاحقاً كفاصل عشري
    if (lastComma > lastDot) {
      // استبدل النقاط كألفية وأبدل الفاصلة بالنقطة
      const withoutDots = cleaned.replace(/\./g, "");
      return Number(withoutDots.replace(",", ".")) || 0;
    } else {
      const withoutCommas = cleaned.replace(/,/g, "");
      return Number(withoutCommas) || 0;
    }
  }
  // إذا يحتوي فقط على ',' نفترض أنها فاصلة عشرية
  if (cleaned.includes(",") && !cleaned.includes(".")) {
    return Number(cleaned.replace(",", ".")) || 0;
  }
  // الباقي: رقم عادي
  return Number(cleaned) || 0;
}

export default function Checkout() {
  const { items } = useCart();

  // حساب المجموع الرقمي بأمان
  const total = useMemo(() => {
    const list = Array.isArray(items) ? items : [];
    return list.reduce((sum, it) => {
      const qty = typeof it.qty === "number" && it.qty > 0 ? it.qty : 1;
      const priceNum = parsePrice(it.price);
      return sum + priceNum * qty;
    }, 0);
  }, [items]);

  // صيغة العرض مع حماية (تضمن أن total رقم)
  const displayTotal = (typeof total === "number" && isFinite(total)) ? total.toLocaleString("ar-EG") : "0";

  return (
    <div style={{ padding: "60px 0", maxWidth: 900, margin: "0 auto", direction: "rtl" }}>
      <h1 style={{ color: "var(--accent)", fontWeight: "bold", fontSize: "2rem", textAlign: "center", marginBottom: 24 }}>إتمام الطلب</h1>

      {(!items || items.length === 0) ? (
        <div className="card" style={{ textAlign: "center" }}>
          سلتك فارغة حالياً.
          <div style={{ marginTop: 12 }}>
            <Link href="/shop" className="btn btn-primary">ابدأ التسوق</Link>
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20 }}>
          <div>
            <div className="card">
              <h2 style={{ marginBottom: 12, fontSize: 18, fontWeight: 800 }}>تفاصيل الفاتورة</h2>

              {/* هنا يمكنك وضع نموذج إدخال العنوان وبيانات العميل */}
              <label style={{ display: "block", marginBottom: 8, fontWeight: 700 }}>الاسم</label>
              <input style={{ width: "100%", padding: 10, marginBottom: 12, borderRadius: 8, border: "1px solid #ffe0b2" }} />

              <label style={{ display: "block", marginBottom: 8, fontWeight: 700 }}>الهاتف</label>
              <input style={{ width: "100%", padding: 10, marginBottom: 12, borderRadius: 8, border: "1px solid #ffe0b2" }} />

              <label style={{ display: "block", marginBottom: 8, fontWeight: 700 }}>العنوان</label>
              <textarea style={{ width: "100%", padding: 10, marginBottom: 12, borderRadius: 8, border: "1px solid #ffe0b2" }} rows={4} />

              <div style={{ marginTop: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontWeight: 700 }}>
                  <div>المجموع</div>
                  <div>{displayTotal} دج</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <button className="btn btn-primary" style={{ padding: "12px 18px", fontSize: 16 }}>ادفع الآن</button>
            </div>
          </div>

          <aside className="card" style={{ height: "fit-content" }}>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 10 }}>ملخص الطلب</div>
            <div style={{ maxHeight: 320, overflow: "auto", marginBottom: 10 }}>
              {items.map(it => (
                <div key={it.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px dashed #f0e6d8" }}>
                  <div style={{ fontWeight: 700 }}>{it.name}</div>
                  <div style={{ color: "#777" }}>
                    { (parsePrice(it.price) * (it.qty || 1)).toLocaleString("ar-EG") } دج
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontWeight: 700 }}>
              <div>المجموع النهائي</div>
              <div>{displayTotal} دج</div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}