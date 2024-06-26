'use client';

import {
  checkImageAvailable,
  getMessagesForUser,
  markChatAsRead,
} from '@/actions';
import { UserIcon } from '../ui';
import { useContext, useEffect, useState } from 'react';
import { IChat } from '@/interfaces';
import { ChatContext } from '@/context';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useInboxStore } from '@/stores';
import { useAuth } from '@/hooks';

type Props = {
  chat: IChat;
};

export const UserListItem = ({ chat }: Props) => {
  const { setChats, removeUnreadChatId } = useInboxStore();
  const { dispatch, chatState } = useContext(ChatContext);
  const router = useRouter();
  const currentId = Cookies.get('userId');
  const { user } = useAuth();

  const [imageUrl, setImageUrl] = useState<string | null>('');
  const [isChatRead, setIsChatRead] = useState(false);

  useEffect(() => {
    setIsChatRead(
      chat.senderId === user?.id ? chat.senderRead : chat.recipientRead
    );
  }, [chat, user]);

  useEffect(() => {
    checkImage(chat.user.avatar);
  }, [chat.user.avatar]);

  const checkImage = async (url: string) => {
    const imageUrl = await checkImageAvailable(url);
    setImageUrl(imageUrl);
  };

  const onHandleClick = async () => {
    dispatch({
      type: '[Chat] - SET_UID',
      payload: currentId,
    });
    dispatch({
      type: '[Chat] - activar-chat',
      payload: chat.id,
    });
    dispatch({
      type: '[Chat] - SET_PROD',
      payload: chat.product,
    });

    //Cargar los mensajes del chat
    const data = await getMessagesForUser(chat.id);

    // console.log(data);
    if (data.ok) {
      dispatch({
        type: '[Chat] - cargar-mensajes',
        payload: data.data,
      });

      await handleMarkAsRead(chat.id);
      router.push(`/inbox?u=${chat.user.id}&n=${chat.user.username}`);
    }
  };

  const handleMarkAsRead = async (chatId: string) => {
    if (!isChatRead) {
      await markChatAsRead(chatId);

      setChats((prevChats) => {
        const updatedChats = prevChats.map((chat: any) =>
          chat.id === chatId
            ? {
                ...chat,
                senderRead: chat.user.id === user?.id ? true : chat.senderRead,
                recipientRead:
                  chat.recipientId === user?.id ? true : chat.recipientRead,
              }
            : chat
        );
        removeUnreadChatId(chatId);

        return updatedChats;
      });

      setIsChatRead(true);
    }
  };

  return (
    <button
      onClick={onHandleClick}
      className={`flex flex-row gap-4 py-4 px-2 border-b-2 cursor-pointer ${
        chat.id === chatState.activeChat ? 'border-l-4 border-blue-400' : ''
      } ${isChatRead ? 'bg-white' : 'bg-gray-100'}`}
    >
      <div className="">
        {imageUrl !== null ? (
          <picture>
            <img
              src={`${imageUrl}`}
              alt={`foto de perfil de ${chat.user.username}`}
              className="object-cover h-12 w-12 rounded-full"
              loading="lazy"
            />
          </picture>
        ) : (
          <span className="w-12 h-12 flex justify-center items-center rounded-full bg-cerise-red-400 font-bold text-white">
            <UserIcon />
          </span>
        )}
      </div>
      <div className="w-full flex flex-col justify-start items-start">
        <div className="w-full flex justify-between items-center">
          <p className={`text-lg font-semibold`}>{chat.user.username}</p>
        </div>
        <div className="flex gap-2 items-start">
          <picture>
            <img src={chat.product.image} alt="" width={32} height={32} />
          </picture>
          <span className="text-gray-500 text-start">{chat.product.title}</span>
        </div>
      </div>
    </button>
  );
};
