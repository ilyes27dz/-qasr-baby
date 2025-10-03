import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";

export default function ToastBanner() {
  const { toastPayload, hideToast } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (toastPayload) {
      setVisible(true);
    } else {
      // slide out
      setVisible(false);
    }
  }, [toastPayload]);

  if (!toastPayload) return null;

  return (
    <div style={container}>
      <div style={{
        ...banner,
        transform: visible ? "translateY(0)" : "translateY(120%)",
        opacity: visible ? 1 : 0
      }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ fontSize: 28 }}>✅</div>
          <div>
            <div style={{ fontWeight: 800, color: "#2e7d32", fontSize: 16 }}>
              "{toastPayload.title}" أضيف إلى السلة
            </div>
            <div style={{ color: "#444", marginTop: 4, fontSize: 14 }}>
              هل تريد متابعة الشراء أم الذهاب للسلة الآن؟
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={() => { hideToast(); }} style={secondaryBtn}>
            متابعة التسوق
          </button>
          <Link href="/cart" style={primaryBtn}>
            الذهاب إلى السلة
          </Link>
        </div>
      </div>
    </div>
  );
}

const container: React.CSSProperties = {
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 20,
  display: "flex",
  justifyContent: "center",
  pointerEvents: "none",
  zIndex: 9999
};

const banner: React.CSSProperties = {
  pointerEvents: "auto",
  width: "min(920px, 95%)",
  background: "linear-gradient(90deg,#fff 0%, #fffde4 100%)",
  borderRadius: 12,
  padding: "14px 18px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
  border: "1px solid #ffe0b2",
  transition: "transform 300ms ease, opacity 300ms ease"
};

const primaryBtn: React.CSSProperties = {
  background: "#ff9800",
  color: "#fff",
  padding: "10px 14px",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 800,
  boxShadow: "0 6px 18px rgba(255,152,0,0.18)"
};

const secondaryBtn: React.CSSProperties = {
  background: "#fff",
  color: "#ff9800",
  padding: "10px 14px",
  borderRadius: 10,
  border: "1.5px solid #ffe0b2",
  fontWeight: 800
};