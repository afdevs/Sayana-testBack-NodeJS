export interface IBill{
    id_Stripe:string,
    date_payment: Date,
    montan_ht:number,
    montant_ttc: number,
    source: string,
}