import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type:String},
    socialOnly: {type:Boolean, default: false}
});

userSchema.pre("save", async function(){
    this.password = await bcrypt.hash(this.password, 3);
});

const UserDB = mongoose.model("User", userSchema);

export default UserDB;