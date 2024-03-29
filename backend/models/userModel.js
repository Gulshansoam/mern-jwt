const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static sign up method
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) throw Error("All fields must be filled");
  if (!validator.isEmail(email)) throw Error("Email is not valid");
  if (!validator.isStrongPassword(password))
    throw Error("Password not strong enough");

  const exist = await this.findOne({ email });
  if (exist) throw Error("Email already in use");
  // hashing the password********
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });
  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error("All fields must be filled");
  const user = await this.findOne({ email });
  if (!user) throw Error("Incorrect Email");
  const validPasswd = await bcrypt.compare(password, user.password);
  if (!validPasswd) throw Error("Incorrect Password");
  return user;
};

module.exports = mongoose.model("User", userSchema);
