import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema: Schema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide email id"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
});

// Encrypt password before saving
UserSchema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Sign and return JWT
UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const UserModel = mongoose.model<UserDocument>("User", UserSchema);
export default UserModel;

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  matchPassword(password: string): boolean;
  getSignedToken(): string;
}
