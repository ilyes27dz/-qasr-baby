import Header from "../components/Header";
import { CartProvider } from "../components/CartContext";
import ToastBanner from "../components/Toast";
import type { AppProps } from "next/app";
import "../styles/global.css"; // إن كان لديك ملف ستايل عام - أنشئه إن لم يكن موجوداً

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Header />
      <Component {...pageProps} />
      <ToastBanner />
    </CartProvider>
  );
}