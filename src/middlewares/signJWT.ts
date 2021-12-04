import jwt from 'jsonwebtoken';
import { IUser } from 'src/interfaces/User';
import { jwtConfig } from '../configs/JWT';

export const signJWT=(user:IUser, callback: (error: Error | null, token: string | null)=>void):void =>{
    const timeSinceEpoch=new Date().getTime();
    const expirationTime= timeSinceEpoch + Number(jwtConfig.expiresTime) * 100000;
    const expirationTimeInSeconds=Math.floor(expirationTime / 1000);

    try {
        jwt.sign(
            {
                id: user._id,
                firstname: user.firstname,
                email: user.email
            }, 
            jwtConfig.secret, 
            {
                algorithm: 'HS256',
                expiresIn: expirationTimeInSeconds
            },
            (error, token)=>{
                if(error){
                    callback(error, null)
                }else if(token){
                    callback(null, token)
                }
            }
        )
    } catch (error:any) {
        callback(error, null);
    }
}
