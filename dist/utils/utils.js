"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDataForTesting = exports.isEmailValid = void 0;
const crypto_1 = require("crypto");
const Bill_1 = require("../models/Bill");
const Song_1 = require("../models/Song");
const isEmailValid = (emailToValidate) => {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegexp.test(emailToValidate);
};
exports.isEmailValid = isEmailValid;
const initDataForTesting = () => __awaiter(void 0, void 0, void 0, function* () {
    const bills = yield Bill_1.Bill.find({});
    if (bills.length < 5) {
        for (let i = 0; i < 10; i++) {
            yield Bill_1.Bill.create({
                id_Stripe: (0, crypto_1.randomUUID)(),
                date_payment: new Date(),
                montan_ht: 100,
                montant_ttc: 100 - 15,
                source: 'Stripe',
            });
        }
    }
    const songs = yield Song_1.Song.find({});
    if (songs.length < 5) {
        for (let i = 0; i < 10; i++) {
            yield Song_1.Song.create({
                name: `Titre du song ${i}`,
                url: `http://sayna-testback-nodejs-/song-${i}`,
                time: `${i} minutes`,
                type: 'mp3'
            });
        }
    }
});
exports.initDataForTesting = initDataForTesting;
//# sourceMappingURL=utils.js.map