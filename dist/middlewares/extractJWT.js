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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_1 = require("../configs/JWT");
function validateToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        console.log('token', authHeader);
        if (token) {
            jsonwebtoken_1.default.verify(token, JWT_1.jwtConfig.secret, (error, decoded) => {
                if (error) {
                    res.status(401).json({
                        error: true,
                        message: "Le token envoyez n'est pas conforme"
                    });
                }
                else {
                    res.locals.jwt = decoded;
                    next();
                }
            });
        }
        else {
            res.status(401).json({
                error: true,
                message: "Le token envoyez n'existe pas "
            });
        }
    });
}
exports.validateToken = validateToken;
//# sourceMappingURL=extractJWT.js.map