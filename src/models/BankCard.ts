import { Schema } from 'mongoose';
import { model } from 'mongoose';
const BankCardSchema= new Schema({
    cardNumber:{
        type: Number,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    default: {
        type: Boolean,
        default: false,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
{ autoCreate: true, timestamps: true });

export const BankCard= model('BankCard', BankCardSchema);