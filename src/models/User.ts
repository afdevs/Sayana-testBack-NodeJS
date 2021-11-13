import { model, Schema } from "mongoose";

const UserSchema= new Schema({
    firstname: String,
    lastname: String,
    date_naissance: String,
    email:{
        type: String,
        required: true
    },
    password: String,
    sexe: String,

});

const User=model("User", UserSchema);
export {User};