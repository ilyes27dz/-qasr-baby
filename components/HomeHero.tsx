import Link from "next/link";
import { useRouter } from "next/router";

export default function HomeHero() {
  const router = useRouter();

  return (
    <section className="hero">
      <div className="hero-top-banner">
        <div>✨ نفخر بثقة أكثر من 800 تاجر يتعاملون معنا</div>
      </div>

      <div className="hero-inner container">
        <div className="hero-left">
          <img
            src="/logo-hero.png"
            alt="قصر الرضيع"
            className="hero-logo"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = "https://via.placeholder.com/360x180?text=Logo"; }}
          />
        </div>

        <div className="hero-right">
          <h1>قصر الرضيع — كل ما يحتاجه طفلك في مكان واحد</h1>
          <p className="hero-sub">
            منتجات آمنة وجودة عالية، توصيل سريع، والدفع عند الاستلام متوفر. اكتشف تشكيلتنا من ملابس، ألعاب، وملحقات الرعاية.
          </p>

          <div className="hero-ctas">
            <Link href="/shop" className="btn btn-primary">ابدأ التسوق الآن</Link>
            <button className="btn btn-ghost" onClick={() => router.push('/categories')}>تصفح الأقسام</button>
          </div>

          <div className="hero-features">
            <div>🚚 توصيل سريع</div>
            <div>💳 دفع عند الاستلام</div>
            <div>✅ ضمان جودة</div>
          </div>
        </div>
      </div>
    </section>
  );
}