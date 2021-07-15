import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name:{type:String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type:String, required: true},
    socialOnly: {type:Boolean, default: false}
});

userSchema.pre("save", async function(){
    this.password = await bcrypt.hash(this.password, 3);
});

const UserDB = mongoose.model("User", userSchema);

export default UserDB;