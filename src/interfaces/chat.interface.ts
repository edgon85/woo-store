export interface IChat {
  id: string;
  lastMessage: string;
  product: string;
  user: IUserChar;
  created_at: string;
}

export interface IMessage {
  id?: string;
  content: string;
  senderId: string;
  recipientId: string;
  timestamp: string;
}

export interface IUserChar {
  id: string;
  avatar: string;
  email: string;
  username: string;
  fullName: string;
}
