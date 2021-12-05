import { Application } from 'express';
import { validateToken } from '../middlewares/extractJWT';
import * as users from '../controllers/UserController';
import * as banks from '../controllers/BankController';
import * as songs from '../controllers/SongController';
import * as bills from '../controllers/BillController';
import * as dashboard from '../controllers/DashboardController';
import { destroyJWT } from '../middlewares/destroyJWT';
export class Routes {
    public routes(app: Application){
        //views routes
        app.route('/dashboard').get(dashboard.dashboardView);

        //login
        app.route('/login').post(users.login);

        //register
        app.route('/register').post(users.register);

        //users
        app.route('/user').put(validateToken, users.update);
        app.route('/user/').delete(validateToken, destroyJWT, users.remove);
        app.route('/user').get(validateToken, users.get);
        app.route('/users').get(validateToken, users.getAll);
        app.route('/user/card').put(validateToken, banks.saveBankCard);
        app.route('/user/cards').get(validateToken, banks.getAll);

        //song
        app.route('/songs').get(validateToken, songs.getAll);
        app.route('/songs/:id').get(validateToken, songs.get);

        //bill
        app.route('/bills').get(validateToken, bills.getAll);
        app.route('/bills/:id').get(validateToken, bills.get);
    }
}