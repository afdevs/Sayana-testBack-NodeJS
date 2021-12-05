"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    firstname: String,
    lastname: String,
    date_naissance: String,
    email: {
        type: String,
        required: true
    },
    password: String,
    confirmPassword: String,
    sexe: String,
    bankCards: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'BankCard'
        }
    ]
}, { autoCreate: true, timestamps: true });
const User = (0, mongoose_1.model)("User", UserSchema);
exports.User = User;
//# sourceMappingURL=User.js.map