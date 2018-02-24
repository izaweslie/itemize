const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
	productName: {type: String, required: true },
	companyName: { type: String },
	ean: { type: String },
	upca: { type: String },
	category:{type: String},
	desc:{type: String},
	price_new:{type: Number},
	quantity: {type: Number, default: 1},
	image:{type: String},
	location:{type: String},
	serialNumber:{type: String, default: "N/A"}, 
	date: { type: Date, default: Date.now }
});

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
