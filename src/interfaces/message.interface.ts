export interface IMessage {
  id?: string;
  from: string;
  to: string;
  message: string;
  messageDate?: string;
  updatedAt?: string;
}
