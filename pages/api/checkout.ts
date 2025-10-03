import type { NextApiRequest, NextApiResponse } from "next";

const stripeSecret = process.env.STRIPE_SECRET_KEY || "";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { items } = req.body;
  if (!items || !Array.isArray(items)) return res.status(400).json({ message: "invalid items" });

  try {
    const line_items = items.map((it: any) => ({
      price_data: {
        currency: "dzd", // إذا Stripe لا يدعم دج مباشرة استخدم "eur" أو "usd" بحسب حسابك
        product_data: { name: it.name },
        unit_amount: Math.round(it.price * 100) // amount in cents (or smallest unit)
      },
      quantity: it.qty
    }));

    const stripe = require("stripe")(stripeSecret);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cart`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error("stripe error:", err);
    return res.status(500).json({ message: err.message || "stripe error" });
  }
}