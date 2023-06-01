export interface shopEntity {
    userId:number,
    nationalId: string,
    address: string,
    taxUnit: string,
    fileNumber: string,
    createDate: Date,
    shopName: string,
    terminalNumber: string,
    companyStartDate: Date | string
}