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
exports.remove = exports.get = exports.getAll = exports.update = exports.register = exports.login = void 0;
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const signJWT_1 = require("../middlewares/signJWT");
const utils_1 = require("../utils/utils");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            if (email === "" || password === "") {
                throw new Error("L'email/password est manquante");
            }
            const user = yield User_1.User.findOne({ email: email });
            if (!user) {
                throw new Error("L'utilisater n'existe pas");
            }
            const check = bcryptjs_1.default.compareSync(password, user.password);
            if (check) {
                (0, signJWT_1.signJWT)(user, (error, token) => {
                    if (error) {
                        throw new Error("Une erreur est apparue lors de la génération du token");
                    }
                    else if (token) {
                        res.status(200).json({
                            error: false,
                            message: "L'utilisateur a été authentifié avec succès",
                            tokens: {
                                token: token,
                                refreshToken: '',
                                createdAt: ''
                            }
                        });
                    }
                });
            }
            else {
                throw new Error("Mot de passe incorrect");
            }
        }
        catch (error) {
            res.status(401).json({
                error: true,
                message: error.message,
                tokens: {
                    token: '',
                    refreshToken: '',
                    createdAt: ''
                }
            });
        }
    });
}
exports.login = login;
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        try {
            if (!isUserDataValidate(user)) {
                throw new Error("Une ou plusieurs des données obligatoire sont manquantes");
            }
            if (!(0, utils_1.isEmailValid)(user.email)) {
                throw new Error("Une ou plusieurs des données sont érronées");
            }
            if (user.password !== user.confirmPassword) {
                throw new Error("Les deux mot de passe sont différents");
            }
            const isUserExist = yield User_1.User.findOne({ email: user.email });
            if (isUserExist) {
                throw new Error("Votre e-mail a déjà été utilisé");
            }
            const hashedPassword = bcryptjs_1.default.hashSync(user.password, 10);
            yield User_1.User.create(Object.assign(Object.assign({}, user), { date_naissnace: new Date(user.date_naissance), password: hashedPassword }));
            (0, signJWT_1.signJWT)(user, (error, token) => {
                if (error) {
                    throw new Error("Une erreur est apparue lors de la génération du token");
                }
                else if (token) {
                    res.status(201).json({
                        error: false,
                        message: "L'utilisateur a été créé avec succès et un token viens de lui est attribué",
                        tokens: {
                            token: token,
                            refreshToken: '',
                            createdAt: Date.now()
                        }
                    });
                }
            });
            res.status(201).json({
                error: false,
                message: "L'utilisateur a bien été créé avec succès",
                tokens: {
                    token: '',
                    refreshToken: '',
                    createdAt: Date.now()
                }
            });
        }
        catch (error) {
            res.status(401).json({
                error: true,
                message: error.message,
                tokens: {
                    token: '',
                    refreshToken: '',
                    createdAt: ''
                }
            });
        }
    });
}
exports.register = register;
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { firstname, lastname, date_naissance } = req.body;
        try {
            const isUserExist = yield User_1.User.findOne({ email: res.locals.jwt.email });
            if (!isUserExist) {
                throw new Error("Utilisateur non trouvé");
            }
            const userUpdated = yield User_1.User.updateOne({ email: res.locals.jwt.email }, {
                $set: {
                    firstname,
                    lastname,
                    date_naissance
                }
            });
            res.status(200).json({
                error: false,
                message: "L'utilisateur a bien été modifié avec succès",
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
exports.update = update;
function getAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield User_1.User.find({}, { password: 0 }).populate({
                path: 'bankCards'
            });
            res.status(200).json({
                error: false,
                users
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
            const user = yield User_1.User.findOne({ email: res.locals.jwt.email }, { password: 0 });
            res.status(200).json({
                error: false,
                user: user
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
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isUserExist = yield User_1.User.findOne({ email: res.locals.jwt.email });
            if (!isUserExist) {
                throw new Error("Utilisateur non trouvé");
            }
            const userDeleted = yield User_1.User.deleteOne({ email: res.locals.jwt.email });
            res.status(200).json({
                error: false,
                user: "L'utilisateur a été déconnecté avec succès"
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
exports.remove = remove;
//Validation
const isUserDataValidate = (user) => {
    return (user.lastname !== "" && user.firstname !== "" && user.email !== "" && user.password !== "");
};
//# sourceMappingURL=UserController.js.map