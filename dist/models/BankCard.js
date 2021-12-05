"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankCard = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const BankCardSchema = new mongoose_1.Schema({
    cardNumber: {
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
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { autoCreate: true, timestamps: true });
exports.BankCard = (0, mongoose_2.model)('BankCard', BankCardSchema);
//# sourceMappingURL=BankCard.js.map