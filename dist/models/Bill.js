"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bill = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const BillSchema = new mongoose_1.Schema({
    id_Stripe: {
        type: String,
        required: true
    },
    date_payment: {
        type: Date,
        required: true
    },
    montan_ht: Number,
    montant_ttc: Number,
    source: String,
}, { autoCreate: true, timestamps: true });
exports.Bill = (0, mongoose_2.model)('Bill', BillSchema);
//# sourceMappingURL=Bill.js.map