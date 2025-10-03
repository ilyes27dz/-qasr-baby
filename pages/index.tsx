import Head from "next/head";
import HomeHero from "../components/HomeHero";
import FeaturedSection from "../components/FeaturedSection";
import CategoriesCarousel from "../components/CategoriesCarousel";
import BrandsCarousel from "../components/BrandsCarousel";
import "../styles/home.css";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>قصر الرضيع — الصفحة الرئيسية</title>
        <meta name="description" content="قصر الرضيع - أفضل منتجات للأطفال والرضع. ملابس، ألعاب، تغذية، وتوصيل سريع." />
      </Head>

      <main className="home-root" dir="rtl">
        <HomeHero />
        <FeaturedSection />
        <CategoriesCarousel />
        <BrandsCarousel />
      </main>
    </>
  );
}