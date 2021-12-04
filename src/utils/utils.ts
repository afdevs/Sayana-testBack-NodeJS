
import { randomUUID } from 'crypto';
import { Bill } from '../models/Bill';
import { Song } from '../models/Song';
export const isEmailValid=(emailToValidate:string):boolean=>{
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegexp.test(emailToValidate);
}


export const initDataForTesting=async ()=>{
    const bills= await Bill.find({});
    if(bills.length<5) {
        for (let i = 0; i < 10; i++) {
            await Bill.create({
                id_Stripe: randomUUID(),
                date_payment: new Date(),
                montan_ht: 100,
                montant_ttc: 100-15,
                source: 'Stripe',
            })       
        }
    }

    const songs= await Song.find({});
    if(songs.length<5) {
        for (let i = 0; i < 10; i++) {
            await Song.create({
                name:`Titre du song ${i}`,
                url: `http://sayna-testback-nodejs-/song-${i}`,
                time: `${i} minutes`,
                type: 'mp3'

            })       
        }
    }

}