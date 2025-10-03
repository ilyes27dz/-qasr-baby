import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function AdminDashboard() {
  const { t } = useTranslation('common')
  return (
    <div style={{ minHeight: "100vh", background: "#fff3e0", padding: 36 }}>
      <h2 style={{ color: "#ff9800", fontWeight: 700, marginBottom: 24 }}>{t('dashboard')}</h2>
      <div style={{ display: "flex", gap: 34, flexWrap: "wrap", marginBottom: 32 }}>
        <StatCard title={t('totalOrders')} value="124" icon="📦" />
        <StatCard title={t('pendingOrders')} value="10" icon="⏳" />
        <StatCard title={t('confirmedOrders')} value="45" icon="✅" />
        <StatCard title={t('shippedOrders')} value="69" icon="🚚" />
      </div>
      <div>
        <button style={{
          padding: "12px 24px", background: "#1565c0", color: "#fff", fontWeight: 700, borderRadius: 8, border: "none"
        }}>{t('products')}</button>
        <button style={{
          padding: "12px 24px", background: "#ff9800", color: "#fff", fontWeight: 700, borderRadius: 8, border: "none", marginLeft: 12
        }}>{t('orders')}</button>
      </div>
      {/* يمكنك إضافة جدول المنتجات أو الطلبات هنا */}
    </div>
  )
}
function StatCard({ title, value, icon }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 10, padding: "20px 32px", boxShadow: "0 2px 8px #81c78422",
      minWidth: 170, textAlign: "center"
    }}>
      <div style={{ fontSize: 30 }}>{icon}</div>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
      <div style={{ color: "#1565c0", fontWeight: 700, fontSize: 26 }}>{value}</div>
    </div>
  )
}
export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale, ['common'])) } }
}