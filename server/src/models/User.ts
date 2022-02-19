import { Schema, Document, Model, model } from "mongoose";

const UserSchema = new Schema({
  email: String,
  password: String,
});

interface IUser {
  email: string;
  password: string;
}

interface IUserDocument extends IUser, Document {}
interface IUserModel extends Model<IUserDocument> {}

const UserModel = model<IUserDocument>("user", UserSchema);

export { UserSchema, IUser, IUserDocument, IUserModel, UserModel };
