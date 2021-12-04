import { Schema } from 'mongoose';
import { model } from 'mongoose';
const SongSchema= new Schema({
    name:{
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    time: String,
    type: String
},
{ autoCreate: true, timestamps: true });

export const Song= model('Song', SongSchema);