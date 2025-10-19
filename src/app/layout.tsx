import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.qasrradee.online'),
  
  title: {
    default: 'قصر الرضيع - متجر ملابس وأدوات الأطفال',
    template: '%s | قصر الرضيع',
  },
  
  description: 'أفضل متجر لملابس وأدوات الأطفال في الجزائر. منتجات عالية الجودة وأسعار مناسبة. شحن لجميع الولايات 🚚',
  
  openGraph: {
    type: 'website',
    locale: 'ar_DZ',
    url: 'https://www.qasrradee.online',
    siteName: 'قصر الرضيع',
    title: 'قصر الرضيع - متجر ملابس وأدوات الأطفال',
    description: 'أفضل متجر لملابس وأدوات الأطفال في الجزائر 🛍️ شحن لجميع الولايات | دفع عند الاستلام',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'قصر الرضيع - متجر ملابس الأطفال',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'قصر الرضيع - متجر ملابس الأطفال',
    description: 'أفضل متجر لملابس وأدوات الأطفال في الجزائر',
    images: ['/og-image.jpg'],
  },
  
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* Facebook Open Graph */}
        <meta property="og:url" content="https://www.qasrradee.online" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="قصر الرضيع - متجر ملابس الأطفال" />
        <meta property="og:description" content="أفضل متجر لملابس وأدوات الأطفال في الجزائر 🛍️" />
        <meta property="og:image" content="https://www.qasrradee.online/og-image.jpg" />
        <meta property="og:locale" content="ar_DZ" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
