import mongoose, {model, Schema} from "mongoose";
mongoose.connect("mongodb+srv://shashankpalingi08_db_user:shashank0806@cluster0.w5mh7vx.mongodb.net/brainly")
const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: String
});

const ContentSchema=new Schema({
    title:String,
    link:String,
    userId:{type:mongoose.Types.ObjectId,ref:'User'},
    tags:[{type:mongoose.Types.ObjectId,ref:'Tag'}],// objectId
    type: String,
    
})

export const UserModel = model("User", UserSchema);

export const ContentModel=model("Content",ContentSchema);