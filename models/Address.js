import mongoose, {model, models, Schema} from "mongoose";

const AddressSchema = new Schema({
  userEmail: {type:String, unique:true, required:true},
  name: String,
  email: String,
  course: String,
  yearLevel: String,
  room: String,
  number: String,
});

export const Address = models?.Address || model('Address', AddressSchema)