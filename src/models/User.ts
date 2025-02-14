import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  country: string;
  createdAt: Date;
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  gender: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  country: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);
  
export default User;
