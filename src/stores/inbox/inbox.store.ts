import { create } from 'zustand';

export interface IChat {
  id: string;
  username: string;
  fullName: string;
  profilePicture: string;
  lastMessage: string;
  timestamp: string;
  messages: IMessage[];
  participants: string[];
}

interface IMessage {
  id?: string;
  content: string;
  senderId: string;
  recipientId: string;
  timestamp: string;
}

interface InboxState {
  chats: IChat[];
  selectedChatId: string | null;
  selectChat: (chatId: string) => void;
  addMessage: (chatId: string, message: IMessage) => void;
  addChat: (chat: IChat) => void;
}

/* interface InboxState {
  chats: IChat[];
  addChat: (newChat: IChat) => void;
} */

export const useInboxStore = create<InboxState>((set) => ({
  chats: [],
  selectedChatId: null,
  selectChat: (chatId: string) => set({ selectedChatId: chatId }),
  addMessage: (chatId, message) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      ),
    })),
  addChat: (chat) => set((state) => ({ chats: [chat, ...state.chats] })),
}));

/* 
 // Ejemplo de chats iniciales
 {
      id: '1',
      username: 'Luis1994',
      fullName: 'Luis Hernandez',
      profilePicture: 'https://source.unsplash.com/_7LbC5J-jw4/600x600',
      lastMessage: 'Hello!',
      timestamp: '2024-04-21T14:48:00.000Z',
      messages: []
    },
    {
      id: '1',
      profilePicture: 'https://source.unsplash.com/_7LbC5J-jw4/600x600',
      username: 'Luis1994',
      lastMessage: 'Hello!',
      timestamp: '2024-04-21T14:48:00.000Z',
    },
    {
      id: '2',
      profilePicture: 'https://source.unsplash.com/otT2199XwI8/600x600',
      username: 'hgEdwin',
      lastMessage: 'Hi there!',
      timestamp: '2024-05-21T14:50:00.000Z',
    },
    {
      id: '3',
      profilePicture: 'https://source.unsplash.com/L2cxSuKWbpo/600x600',
      username: 'JonDoe',
      lastMessage: 'Hi there!',
      timestamp: '2024-06-21T14:50:00.000Z',
    },
    {
      id: '4',
      profilePicture: 'https://source.unsplash.com/vpOeXr5wmR4/600x600',
      username: 'MiduDev',
      lastMessage: 'Hi there!',
      timestamp: '2024-07-21T14:50:00.000Z',
    },
*/
