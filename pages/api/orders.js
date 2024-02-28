import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOption } from "./auth/[...nextauth]";
import { Order } from "@/models/Order";

export default async function handle(req, res) {
  await mongooseConnect();
  const { user } = await getServerSession(req, res, authOption);
  res.json(await Order.find({ userEmail: user.email }));
}
