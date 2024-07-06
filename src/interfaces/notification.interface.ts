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
  MESSAGE = 'message',
  SALE = 'sale',
  OTHER = 'other',
  NEW_OFFER = 'new-offer',
  ACCEPT_OFFER = 'accept-offer',
  REJECT_OFFER = 'reject-offer',
}
