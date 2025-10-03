export default function Contact() {
  return (
    <div style={{
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#faf8f3",
      direction: "rtl"
    }}>
      <form style={{
        background: "#fff",
        padding: 36,
        borderRadius: 12,
        boxShadow: "0 2px 16px #ff980033",
        minWidth: 340
      }}>
        <h2 style={{ color: "#ff9800", marginBottom: 28, fontWeight: 700, fontSize: "2rem", textAlign: "center" }}>اتصل بنا</h2>
        <input type="text" placeholder="اسمك" style={inputStyle} />
        <input type="email" placeholder="البريد الإلكتروني" style={inputStyle} />
        <textarea placeholder="رسالتك" style={{ ...inputStyle, height: 80, resize: "vertical" }} />
        <button type="submit" style={buttonStyle}>إرسال</button>
      </form>
    </div>
  );
}
const inputStyle = { width: "100%", marginBottom: 18, padding: "10px 12px", borderRadius: 8, border: "1.5px solid #ffecb3", fontSize: 16 };
const buttonStyle = { width: "100%", padding: "12px", background: "#ff9800", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 18, cursor: "pointer" };