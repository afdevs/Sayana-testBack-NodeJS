import { IUser } from "./User";

export interface IBankCard{
    cardNumber:number,
    month: string,
    year: string,
    default:boolean,
    user: IUser | string
}