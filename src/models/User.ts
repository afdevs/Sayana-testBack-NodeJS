import { model, Schema, Types } from "mongoose";

const UserSchema= new Schema({
    firstname: String,
    lastname: String,
    date_naissance: String,
    email:{
        type: String,
        required: true
    },
    password: String,
    confirmPassword: String,
    sexe: String,
    bankCards: [
        {
            type: Schema.Types.ObjectId,
            ref: 'BankCard'
        }
    ]

},
{ autoCreate: true, timestamps: true }
);

const User=model("User", UserSchema);
export {User};