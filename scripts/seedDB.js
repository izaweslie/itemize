const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost/itemize",
	{
		useMongoClient: true
	}
);

const userSeed = [
	{
		user_id: "1",
		item:
		[
			{
				productName: "Diet Coke, 12-Ounce Cans (Pack Of 24)",
				companyName: "The Coca-Cola Company",
				ean: "0049000006582",
				upca: "049000006582",
				category: "Beverages",
				desc: "Diet Coke is the most popular sugar-free soft drink in America. It's the original sparkling beverage for those who want great flavor without the calories\u2014a drink for those with great taste.",
				price_new: "8.0000",
				image: "https://eandata.com/image/products/004/900/000/0049000006582.jpg?m=1395415806",
				location: "Kitchen",
				date: new Date(Date.now())
			},
			{

				productName: "Medium Binder Clips, Steel Wire, 5/8\" Cap., 1-1/4\" Wide, Black/Silver, 36/Pack",
				companyName: "Universal Office Products (United Stationers Suppl",
				ean: "0087547102107",
				upca: "087547102107",
				category: "Office / School Supplies",
				desc: "** Ultra-efficient binder clips feature handles that can be hung, folded flat against clipped material or removed for permanent binding. Efficient triangular design provides optimum strength and compression. Stock up and save! Clip/Clamp Type: Binder Clips; Color(s): Black;Silver; Material(s): Steel Clip;Steel Wire. **",
				price_new: "0.9900",
				image: "https://eandata.com/image/products/008/754/710/0087547102107.jpg?m=1389539523",
				location: "Office",
				date: new Date(Date.now())
			}
		]
	},
	{
		user_id: "2",
		item:
		[
			{
				productName: "Expo - Cleaner For Dry Erase Surfaces - 8oz.",
				companyName: "Newell Rubbermaid Office Products",
				ean: "0071641818033",
				upca: "071641818033",
				category: "Office / School Supplies",
				desc: "Expo Non-Toxic Whiteboard Cleaner, 1 8 oz Spray Bottle",
				price_new: "0.0100",
				image: "https://eandata.com/image/products/007/164/181/0071641818033.jpg?m=1354692549",
				location: "Office",
				date: new Date(Date.now())
			},
			{
				productName: "Swingline Speedpoint Staples",
				companyName: "ACCO Brands",
				ean: "0074711354509",
				upca: "074711354509",
				category: "Office / School Supplies",
				desc: "Swingline top-quality, premium staples provide clean, consistent stapling you can rely on with 75 percent fewer misforms than other staples. The sharp chisel points offer easy penetration and reduce jamming on important projects. With 210 staples per strip, they are designed to provide the best performance you can get from standard staplers. The Swingline S7035450P S.F. 4 Premium Staples have a 0.25 inch leg length and can staple up to 25 sheets of 20 pound paper at a time. Available in a 5,000 count box, you will have plenty of staples to complete even the biggest stapling jobs. The staples also come in a durable, reusable storage case so you will always have your staples in one place. Swingline, a leading brand in workspace tools for the business, home and mobile office for over 80 years continues to introduce new staplers, sharpeners, punches and trimmers that solve common workplace frustrations and increase productivity. With unmatched quality, durability and performance, Swingline products are truly designed for the way you work!",
				price_new: "0.4800",
				image: "https://eandata.com/image/products/007/471/135/0074711354509.jpg?m=1353341180",
				location: "Kitchen Drawer",
				date: new Date(Date.now())
			}
		]
	},
	{
		user_id: "3",
		item:
		[
			{
				productName: "Jergens Ultra Healing Extra Dry Skin Moisturizer",
				companyName: "The Andrew Jergens Company",
				ean: "0019100110656",
				upca: "019100110656",
				category: "Bath / Beauty / Hygiene",
				desc: "Jergens® Ultra Healing® Extra Dry Skin Moisturizer.<br />25% bonus.<br />Repairs & heals extra dry skin with Vitamins C, E & B5.",
				price_new: "9.9900",
				image: "https://eandata.com/image/products/001/910/011/0019100110656.jpg?m=1319375704",
				location: "Bedroom",
				date: new Date(Date.now())
			}
		]
	},
]

db.User
	.remove({})
	.then(() => db.User.collection.insertMany(userSeed))
	.then(data => {
		console.log(data.insertedIds.length + " records inserted!");
		process.exit(0);
	})
	.catch(err => {
		console.error(err);
		process.exit(1);
	});
