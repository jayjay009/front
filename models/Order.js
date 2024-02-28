const { model, models, Schema } = require("mongoose");

const OrderSchema = new Schema(
  {
    userEmail: String, 
    line_items: Object,
    name: String,
    email: String,
    city: String,
    posttalCode: String,
    streetAddress: String,
    country: String,
    paid: Boolean,
  },
  {
    timestamps: true,
  }
);

export const Order = models?.Order || model("Order", OrderSchema);
