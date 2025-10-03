import { useRouter } from 'next/router'

const LanguageSwitcher = () => {
  const router = useRouter()
  const { locale, locales, asPath } = router

  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {locales?.map((lng) => (
        <button
          key={lng}
          onClick={() => router.push(asPath, asPath, { locale: lng })}
          disabled={locale === lng}
          style={{
            background: locale === lng ? '#ff9800' : '#e3e3e3',
            color: locale === lng ? '#fff' : '#333',
            border: 'none',
            borderRadius: 6,
            padding: '4px 12px',
            cursor: locale === lng ? 'default' : 'pointer',
            fontWeight: 700,
            fontSize: 15,
            outline: 'none',
            transition: '0.15s'
          }}
        >
          {lng === 'ar' ? 'AR' : 'FR'}
        </button>
      ))}
    </div>
  )
}
export default LanguageSwitcher