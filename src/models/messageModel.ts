export interface messageModel {
  subject?: string;
  userId: number;
  messageBody?: string;
  createDate: Date | String;
  parentMessageId?: number;
  isForwarded?: boolean;
  recipientUserId: number;
  recipientGroupId?: number;
  fileData?: object | null;
}
