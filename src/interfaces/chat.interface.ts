export interface IChat {
  id: string;
  lastMessage: string;
  product: IChatProduct;
  user: IUserChar;
  created_at: string;
  senderRead: boolean;
  recipientRead: boolean;
  senderId: string;
  recipientId: string;
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

export interface IChatProduct {
  id: string;
  slug: string;
  title: string;
  status: string;
  price: number;
  image: string;
}
