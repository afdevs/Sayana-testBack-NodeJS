import { Application } from 'express';
import { validateToken } from '../middlewares/extractJWT';
import * as users from '../controllers/UserController';
import { destroyJWT } from '../middlewares/destroyJWT';
export class Routes {
    public routes(app: Application){
        app.route('/login').post(users.login);
        app.route('/register').post(users.register);
        app.route('/user').put(validateToken, users.update);
        app.route('/user/').delete(validateToken, destroyJWT, users.remove);
        app.route('/user').get(validateToken, users.get);
        app.route('/users').get(validateToken, users.getAll);
    }
}