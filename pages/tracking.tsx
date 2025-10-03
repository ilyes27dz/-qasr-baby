export default function Tracking() {
  return (
    <div style={{ padding: "60px 0", maxWidth: 600, margin: "0 auto", direction: "rtl" }}>
      <h1 style={{ color: "#ff9800", fontWeight: "bold", fontSize: "2.3rem", textAlign: "center", marginBottom: 30 }}>
        تتبع الطلب
      </h1>
      <form style={{ background: "#fff", padding: 30, borderRadius: 14, boxShadow: "0 2px 14px #ff980044" }}>
        <label style={{ fontWeight: 700, fontSize: 18, color: "#2e7d32", marginBottom: 11, display: "block" }}>
          رقم الطلب:
        </label>
        <input type="text" placeholder="أدخل رقم الطلب هنا" style={{
          width: "100%",
          padding: "12px",
          borderRadius: 9,
          border: "2px solid #ffecb3",
          fontSize: 17,
          marginBottom: 16
        }} />
        <button type="submit" style={{
          background: "#ff9800",
          color: "#fff",
          padding: "12px 30px",
          borderRadius: 9,
          fontWeight: 700,
          fontSize: "1rem",
          border: "none",
          marginTop: 10,
          cursor: "pointer"
        }}>
          تتبع الطلب
        </button>
      </form>
    </div>
  );
}