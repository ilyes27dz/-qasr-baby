export default function Footer() {
  return (
    <footer style={{ padding: 24, marginTop: 36, background: "#fff", borderTop: "1px solid #f0e6d6" }}>
      <div className="container space-between" style={{ flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontWeight: 800, color: "var(--color-primary)" }}>قصر الرضيع</div>
          <div style={{ fontSize: 14, color: "#666" }}>جميع الحقوق محفوظة © {new Date().getFullYear()}</div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <a href="#" style={{ color: "#666", textDecoration: "none" }}>سياسة الخصوصية</a>
          <a href="#" style={{ color: "#666", textDecoration: "none" }}>شروط الاستخدام</a>
        </div>
      </div>
    </footer>
  );
}