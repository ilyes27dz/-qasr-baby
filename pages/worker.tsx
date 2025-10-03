import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function WorkerDashboard() {
  const { t } = useTranslation('common')
  return (
    <div style={{ minHeight: "100vh", background: "#e3f0ff", padding: 36 }}>
      <h2 style={{ color: "#1565c0", fontWeight: 700, marginBottom: 24 }}>{t('dashboard') + " - " + (t('worker') || "عامل")}</h2>
      <div style={{ background: "#fff", borderRadius: 10, padding: "22px", boxShadow: "0 2px 8px #1565c055" }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>{t('orders')}</div>
        {/* جدول الطلبات للتوصيل أو العمل */}
        <div>هنا تعرض قائمة الطلبات التي يجب التعامل معها (مثال فقط)</div>
      </div>
    </div>
  )
}
export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale, ['common'])) } }
}