import { Product } from "./Product";

const { Schema, models, model } = require("mongoose");

const WishedProductShcema = new Schema({
  userEmail: { type: String, required: true },
  product: { type: Schema.Types.ObjectId, ref: Product},
});

export const WishedProduct =
  models?.WishedProduct || model("WishedProduct", WishedProductShcema);
