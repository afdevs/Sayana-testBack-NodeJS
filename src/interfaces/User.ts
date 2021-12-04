import { IBankCard } from './BankCard';
export interface IUser{
    _id?: string;
    firstname: string,
    lastname: string,
    date_naissance: string,
    email:string,
    password: string,
    confirmPassword: string,
    sexe: string,
    bankCards: [IBankCard] 
}
