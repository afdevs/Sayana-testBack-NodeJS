import { Application } from 'express';
import * as users from '../controllers/UserController';
export class Routes {
    public routes(app: Application){
        app.route('/login').post(users.login);
        app.route('/register').post(users.register);
        app.route('/user').put(users.update);
        app.route('/user').delete(users.remove);
        app.route('/user').get(users.get);
        app.route('/users').get(users.getAll);
    }
}