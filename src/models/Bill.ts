import { Schema } from 'mongoose';
import { model } from 'mongoose';
const BillSchema= new Schema({
    id_Stripe:{
        type: String,
        required: true
    },
    date_payment: {
        type: Date,
        required: true
    },
    montan_ht:Number,
    montant_ttc: Number,
    source: String,
},
{ autoCreate: true, timestamps: true });

export const Bill= model('Bill', BillSchema);