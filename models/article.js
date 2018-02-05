const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  productName: {type: String, required: true },
  companyName: { type: String },
  ean: { type: String },
  upca: { type: String },
  category:{type: String},
  desc:{type: String},
  price_new:{type: String},
  image:{type: String},
  location:{type: String},
  serialNumber:{type: String}
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
