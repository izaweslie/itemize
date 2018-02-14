const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	user_id: { type: String, unique: true },
	items: [{
		type: Schema.Types.ObjectId,
		ref: "Item"
	}]
});

const Users = mongoose.model("User", UserSchema);

module.exports = Users;
