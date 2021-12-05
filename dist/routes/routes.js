"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const extractJWT_1 = require("../middlewares/extractJWT");
const users = __importStar(require("../controllers/UserController"));
const banks = __importStar(require("../controllers/BankController"));
const songs = __importStar(require("../controllers/SongController"));
const bills = __importStar(require("../controllers/BillController"));
const dashboard = __importStar(require("../controllers/DashboardController"));
const destroyJWT_1 = require("../middlewares/destroyJWT");
class Routes {
    routes(app) {
        //views routes
        app.route('/dashboard').get(dashboard.dashboardView);
        //login
        app.route('/login').post(users.login);
        //register
        app.route('/register').post(users.register);
        //users
        app.route('/user').put(extractJWT_1.validateToken, users.update);
        app.route('/user/').delete(extractJWT_1.validateToken, destroyJWT_1.destroyJWT, users.remove);
        app.route('/user').get(extractJWT_1.validateToken, users.get);
        app.route('/users').get(extractJWT_1.validateToken, users.getAll);
        app.route('/user/card').put(extractJWT_1.validateToken, banks.saveBankCard);
        app.route('/user/cards').get(extractJWT_1.validateToken, banks.getAll);
        //song
        app.route('/songs').get(extractJWT_1.validateToken, songs.getAll);
        app.route('/songs/:id').get(extractJWT_1.validateToken, songs.get);
        //bill
        app.route('/bills').get(extractJWT_1.validateToken, bills.getAll);
        app.route('/bills/:id').get(extractJWT_1.validateToken, bills.get);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map