import { IChat } from '@/interfaces';
import { create } from 'zustand';

interface InboxStore {
  chats: IChat[];
  unreadCount: number;
  unreadChatIds: Set<string>;
  setChats: (chats: IChat[] | ((prevChats: IChat[]) => IChat[])) => void;
  addUnreadChatId: (chatId: string) => void;
  removeUnreadChatId: (chatId: string) => void;
}

export const useInboxStore = create<InboxStore>()((set) => ({
  chats: [],
  unreadCount: 0,
  unreadChatIds: new Set(),
  setChats: (chats) =>
    set((state) => ({
      chats: typeof chats === 'function' ? chats(state.chats) : chats,
    })),
  addUnreadChatId: (chatId) =>
    set((state) => {
      const newUnreadChatIds = new Set(state.unreadChatIds);
      newUnreadChatIds.add(chatId);
      return {
        unreadChatIds: newUnreadChatIds,
        unreadCount: newUnreadChatIds.size,
      };
    }),
  removeUnreadChatId: (chatId) =>
    set((state) => {
      const newUnreadChatIds = new Set(state.unreadChatIds);
      newUnreadChatIds.delete(chatId);
      return {
        unreadChatIds: newUnreadChatIds,
        unreadCount: newUnreadChatIds.size,
      };
    }),
}));
