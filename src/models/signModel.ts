export interface signDto {
    mobile?: string,
    mail?:string,
    firstName?:  string,
    lastName?: string,
    password: string,
    verifyCode: string,
    encryptedMail?: string,
    type: number,
    userName:string|null,
    userRole?:number
}