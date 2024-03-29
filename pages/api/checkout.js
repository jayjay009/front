import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOption } from "./auth/[...nextauth]";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("should be a POST request");
    return;
  }
  const {
    name,
    email,
    course,
    yearLevel,
    room,
    number,
    cartProducts,
  } = req.body;
  await mongooseConnect();
  const productIds = cartProducts;
  const uniqueIds = [...new Set(productIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];
  for (const productId of uniqueIds) {
    const productsInfo = productsInfos.find(
      (p) => p._id.toString() === productId
    );
    const quantity = productIds.filter((id) => id === productId)?.length || 0;
    if (quantity > 0 && productsInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "PHP",
          product_data: { name: productsInfo.title },
          unit_amount: quantity * productsInfo.price * 100,
        },
      });
    }
  }

  const session = await getServerSession(req, res, authOption)

  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    course,
    yearLevel,
    room,
    number,
    paid: false,
    userEmail: session?.user?.email,
  });

  const stripeSession = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.REACT_APP_PUBLIC_URL + '/cart?success=1',
    cancel_url: process.env.REACT_APP_PUBLIC_URL + '/cart?canceled=1',    
    metadata: { orderId: orderDoc._id.toString() },
    allow_promotion_codes: true,
  });

  res.json({
    url: stripeSession.url,
  });
}
