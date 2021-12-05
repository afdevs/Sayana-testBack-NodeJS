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
exports.get = exports.getAll = void 0;
const Bill_1 = require("../models/Bill");
function getAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bills = yield Bill_1.Bill.find({}, { password: 0 });
            res.status(200).json({
                error: false,
                bills
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
            const bill = yield Bill_1.Bill.findOne({ _id: req.params.id });
            res.status(200).json({
                error: false,
                bill
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
//# sourceMappingURL=BillController.js.map