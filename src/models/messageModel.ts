

export interface messageModel {
    subject?:string,
    userId:number,
    messageBody?:string | number,
    createDate:Date,
    parentMessageId?:number,
    isForwarded?:boolean,
    recipientUserId:number,
    recipientGroupId?:number,
    fileData?:object | null
}