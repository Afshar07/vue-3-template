export interface order {
    createDate: Date,
    exchange: number |null,
    market: string,
    type: number,
    percent: number,
    status?:number,
    amount: string,
    cryptoAccountId:number,
    riskAversion: number,
    length?: number,
    timeFrame: string,
    method: number |null,
    userId?: number,
    profit?:number | null,
    updateDate?:Date
}