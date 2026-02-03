import mongoose, {model, Schema} from "mongoose";
mongoose.connect("mongodb+srv://shashankpalingi08_db_user:shashank0806@cluster0.w5mh7vx.mongodb.net/brainly")
const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: String
});

export const UserModel = model("User", UserSchema);