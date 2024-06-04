import { create } from 'zustand';

export interface IChat {
  id: string;
  lastMessage: string;
  chatInboxDate: string;
  user: {
    id: string;
    username: string;
    avatar: string;
  };
  recipient: {
    id: string;
    username: string;
    avatar: string;
  };
  messages: IMessage[];
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
  pendingMessage: string;
  setChats: (newChats: IChat[]) => void;
  selectChat: (chatId: string) => void;
  addMessage: (chatId: string, message: IMessage) => void;

  setPendingMessage: (message: string) => void;
  clearPendingMessage: () => void;

  addChat: (chat: IChat) => void;
}

export const useInboxStore = create<InboxState>()((set) => ({
  chats: [],
  selectedChatId: null,
  pendingMessage: '',
  selectChat: (chatId) => set({ selectedChatId: chatId }),

  setChats: (newChats) =>
    set((state) => ({
      chats: [
        ...state.chats,
        ...newChats.filter(
          (newChat) => !state.chats.some((chat) => chat.id === newChat.id)
        ),
      ],
    })),
  addMessage: (chatId, message) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      ),
    })),
  addChat: (chat) =>
    set((state) => {
      const existingChat = state.chats.find((c) => c.id === chat.id);
      if (!existingChat) {
        return {
          chats: [...state.chats, chat],
        };
      }
      return state;
    }),

  setPendingMessage: (message) => set({ pendingMessage: message }),
  clearPendingMessage: () => set({ pendingMessage: '' }),
}));
