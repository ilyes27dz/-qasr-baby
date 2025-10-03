import React from "react";
import Link from "next/link";

type Props = {
  open: boolean;
  productName?: string;
  onClose?: () => void;
};

export default function ConfirmModal({ open, productName, onClose }: Props) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 220 }}>
      <div style={{ width: 520, background: "#fff", borderRadius: 14, padding: 28, textAlign: "center" }}>
        <div style={{ fontSize: 48, color: "#43a047" }}>✔</div>
        <h3 style={{ marginTop: 6, color: "#222" }}>تم الإضافة!</h3>
        <p style={{ color: "#666" }}>تم إضافة <strong style={{ color: "var(--color-primary)" }}>{productName}</strong> إلى سلة المشتريات.</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 16 }}>
          <Link href="/cart" className="btn" style={{ background: "#263238", color: "#fff" }}>عرض السلة</Link>
          <button onClick={onClose} className="btn btn-primary">نعم، متابعة</button>
        </div>
      </div>
    </div>
  );
}