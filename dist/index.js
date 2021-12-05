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
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes/routes");
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = require("./configs/server");
const utils_1 = require("./utils/utils");
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
var session;
const app = (0, express_1.default)();
const route = new routes_1.Routes();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
try {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        console.log(server_1.serverConfig.mongoURI);
        const db = yield mongoose_1.default.connect(`${server_1.serverConfig.mongoURI}`);
        console.log('Database is connected to:', db.connection.host, db.connection.name);
    }))();
    app.set("view engine", "ejs");
    const oneDay = 1000 * 60 * 60 * 24;
    app.use((0, express_session_1.default)({
        secret: "supersecrettoken",
        saveUninitialized: true,
        cookie: { maxAge: oneDay },
        resave: false
    }));
    (0, utils_1.initDataForTesting)();
    route.routes(app);
    const port = server_1.serverConfig.port || 8000;
    app.listen(port, () => {
        console.log(`Server is running on Port: ${port}`);
    });
}
catch (error) {
}
//# sourceMappingURL=index.js.map