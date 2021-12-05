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
exports.get = exports.getAll = exports.saveBankCard = void 0;
const BankCard_1 = require("../models/BankCard");
const User_1 = require("../models/User");
function saveBankCard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        data.user = res.locals.jwt.id;
        try {
            if (!isBankDataValidate(data)) {
                throw new Error("Une ou plusieurs des données obligatoire sont manquantes");
            }
            const addedCardBank = yield BankCard_1.BankCard.create(Object.assign({}, data));
            console.log(addedCardBank);
            const userUpdated = yield User_1.User.updateOne({ email: res.locals.jwt.email }, {
                $push: {
                    bankCards: [addedCardBank._id]
                }
            });
            res.status(200).json({
                error: false,
                message: "Vos données bancaire ont été mise à jour",
            });
        }
        catch (error) {
            res.status(401).json({
                error: true,
                message: error.message,
            });
        }
    });
}
exports.saveBankCard = saveBankCard;
function getAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const banks = yield BankCard_1.BankCard.find({}, { password: 0 }).populate({
                path: 'user'
            });
            res.status(200).json({
                error: false,
                banks
            });
        }
        catch (error) {
            res.status(401).json({
                error: true,
                message: error.message,
            });
        }
    });
}
exports.getAll = getAll;
function get(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bank = yield BankCard_1.BankCard.findOne({ _id: req.params.id });
            res.status(200).json({
                error: false,
                bank
            });
        }
        catch (error) {
            res.status(401).json({
                error: true,
                message: error.message,
            });
        }
    });
}
exports.get = get;
//Validation
const isBankDataValidate = (bankCard) => {
    const missingData = false;
    if (!bankCard.cardNumber || !bankCard.month || !bankCard.year)
        return false;
    return (bankCard.cardNumber > 0 && bankCard.month !== "" && bankCard.year !== "");
};
//# sourceMappingURL=BankController.js.map