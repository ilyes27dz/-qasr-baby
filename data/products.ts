export type Product = {
  id: string;
  name_ar: string;
  category: string; // category slug
  price: number; // رقم بالعملة المحلية (دج)
  img?: string;
  description?: string;
};

export type Category = {
  slug: string;
  name_ar: string;
  img?: string;
};

export const CATEGORIES: Category[] = [
  { slug: "feeding", name_ar: "التغذية" },
  { slug: "nursing", name_ar: "الرضاعة" },
  { slug: "clothing", name_ar: "ملابس" },
  { slug: "accessories", name_ar: "الخَرجات / حقيبة الأم" },
  { slug: "sleep", name_ar: "النوم" },
  { slug: "hygiene", name_ar: "النظافة" },
  { slug: "strollers", name_ar: "عربات و مقاعد" },
  { slug: "toys", name_ar: "ألعاب" },
  // أضف المزيد إن أردت
];

export const PRODUCTS: Product[] = [
  { id: "p1", name_ar: "زجاجة رضاعة زجاجية", category: "feeding", price: 950, img: "https://images.unsplash.com/photo-1526403224743-2b2d9b94f4b9?auto=format&fit=crop&w=400&q=80" },
  { id: "p2", name_ar: "حلمات رضاعة إضافية", category: "feeding", price: 120, img: "https://images.unsplash.com/photo-1582719478180-6e6b9a3b2b1b?auto=format&fit=crop&w=400&q=80" },
  { id: "p3", name_ar: "مضخة حليب كهربائية", category: "nursing", price: 4500, img: "https://images.unsplash.com/photo-1581579182385-8f47f9d0b6c5?auto=format&fit=crop&w=400&q=80" },
  { id: "p4", name_ar: "بلوزة أطفال قطن", category: "clothing", price: 800, img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" },
  { id: "p5", name_ar: "سرير محمول", category: "sleep", price: 6800, img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80" },
  { id: "p6", name_ar: "عربة أطفال خفيفة", category: "strollers", price: 12500, img: "https://images.unsplash.com/photo-1520975698511-8a8f0f5e5c5a?auto=format&fit=crop&w=400&q=80" },
  { id: "p7", name_ar: "لعبة دمية آمنة", category: "toys", price: 1200, img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
  { id: "p8", name_ar: "حقيبة أم كبيرة", category: "accessories", price: 4200, img: "https://images.unsplash.com/photo-1541534741688-6078f2a1ef63?auto=format&fit=crop&w=400&q=80" }
  // أضف منتجات إضافية هنا حسب الحاجة أو بدلها ببيانات من قاعدة بياناتك لاحقاً
];