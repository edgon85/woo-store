export interface INotification {
  id: string;
  message: string;
  read: boolean;
  type: NotificationType;
  userId: string;
  createdAt: string;
  chatId?: string;
  url: string;
}

export enum NotificationType {
  MESSAGE = "MESSAGE",
  SALE = "SALE",
  OTHER = "OTHER",
  OFFER = "OFFER",
}
