import Link from "next/link";
import { useCart } from "./CartContext";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Header() {
  const { cartCount } = useCart();
  const router = useRouter();
  const [q, setQ] = useState("");

  const onSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const term = (q || "").trim();
    if (!term) {
      router.push("/shop");
    } else {
      router.push(`/search?q=${encodeURIComponent(term)}`);
    }
  };

  return (
    <header style={{
      background: "#fff",
      boxShadow: "0 2px 10px #ffecb366",
      position: "sticky",
      top: 0,
      zIndex: 10,
      direction: "rtl"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: 1350,
        margin: "0 auto",
        padding: "0 20px",
        height: 78
      }}>
        <div style={{
          fontWeight: "bold",
          fontSize: "2.2rem",
          color: "#ff9800",
          letterSpacing: "2px",
          minWidth: 190,
          textAlign: "right",
          display: "flex",
          alignItems: "center",
          gap: 6
        }}>
          <span>قصر الرضيع</span>
          <span style={{ fontSize: "2.2rem", marginRight: 5 }} role="img" aria-label="أيقونة">🧸</span>
        </div>

        {/* مربع البحث الجديد */}
        <form onSubmit={onSearch} style={{ flex: 1, display: "flex", justifyContent: "center", padding: "0 20px" }}>
          <div style={{ maxWidth: 640, width: "100%", display: "flex", gap: 8 }}>
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="ابحث عن منتج، قسم أو كلمة..."
              aria-label="بحث"
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid #ffe0b2",
                fontSize: 16,
                outline: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
              }}
            />
            <button type="submit" style={{
              background: "#ff9800",
              color: "#fff",
              padding: "10px 14px",
              borderRadius: 10,
              fontWeight: 700,
              border: "none",
              cursor: "pointer"
            }}>
              بحث
            </button>
          </div>
        </form>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginRight: "auto"
        }}>
          <Link href="/login" style={buttonStyle as any}>تسجيل الدخول</Link>
          <Link href="/signup" style={buttonStyle2 as any}>تسجيل جديد</Link>
          <Link href="/cart" style={{
            position: "relative",
            marginLeft: 10,
            background: "#fff",
            borderRadius: "50%",
            boxShadow: "0 2px 8px #ff980044",
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1.5px solid #ffe0b2"
          }}>
            <span style={{ fontSize: 27, color: "#ff9800" }}>🛒</span>
            {cartCount > 0 && (
              <span style={{
                position: "absolute",
                top: -7,
                left: -12,
                background: "#e53935",
                color: "#fff",
                borderRadius: "50%",
                padding: "4px 8px",
                fontWeight: "bold",
                fontSize: 13,
                boxShadow: "0 1px 5px #e5393555"
              }}>{cartCount}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, text }: { href: string; text: string }) {
  return (
    <Link href={href} style={{
      textDecoration: "none",
      color: "#424242",
      fontWeight: 700,
      fontSize: 18,
      padding: "8px 16px",
      borderRadius: 9,
      background: "#fff",
      transition: "background 0.18s, color 0.18s",
      boxShadow: "0 1px 3px #ffe5b599",
      border: "1.5px solid #ffe0b2",
      marginLeft: 1
    }}
      onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = "#ffecb3"; (e.currentTarget as HTMLElement).style.color = "#ff9800"; }}
      onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = "#fff"; (e.currentTarget as HTMLElement).style.color = "#424242"; }}
    >
      {text}
    </Link>
  );
}

const buttonStyle = {
  background: "#ff9800",
  color: "#fff",
  fontWeight: 700,
  fontSize: 16,
  borderRadius: 8,
  padding: "8px 19px",
  textDecoration: "none",
  border: "none",
  boxShadow: "0 2px 8px #ff980033",
  transition: "background 0.18s"
};
const buttonStyle2 = {
  background: "#fff",
  color: "#ff9800",
  fontWeight: 700,
  fontSize: 16,
  borderRadius: 8,
  padding: "8px 19px",
  textDecoration: "none",
  border: "1.5px solid #ffe0b2",
  boxShadow: "0 2px 8px #ff980033",
  transition: "background 0.18s"
};