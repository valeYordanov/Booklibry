const { Schema, model, Types } = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, },
  country: { type: String, required: true },
  tel: { type: Number, required: true },
  books: [{ type:Types.ObjectId, required: true, ref: 'Book' }]
});

const User = model("User", userSchema);

userSchema.plugin(uniqueValidator)

module.exports =  User ;
