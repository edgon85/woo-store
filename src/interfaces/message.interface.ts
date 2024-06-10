export interface IMessage {
  id?: string;
  from: string;
  to: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}
