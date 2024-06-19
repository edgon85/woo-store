'use client';
import { IChat } from '@/interfaces';
import { useContext } from 'react';
import { ChatContext } from '@/context';
import { UserListItem } from './UserListItem';
import { ChatWindow } from './ChatWindow';
import { ChatInput } from './ChatInput';
import { GoArrowLeft } from 'react-icons/go';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib';
import Link from 'next/link';
import { DropDownSettings } from './DropDownSettings';

type Props = {
  recipientId?: string;
  username?: string;
};

export const InboxMainComponent = ({
  recipientId = '',
  username = '',
}: Props) => {
  const { chatState, dispatch } = useContext(ChatContext);
  const router = useRouter();

  const onHandleClick = () => {
    router.push('/inbox');
    dispatch({ type: '[Chat] - DELETE_CHAT_ACTIVE' });
  };

  return (
    <>
      <div className="main-wrapper min-h-[70vh] p-4 md:p-0 border">
        <div
          className={`px-5 py-5 ${
            chatState.activeChat ? 'flex' : 'hidden'
          } justify-between items-center bg-white border-b-2`}
        >
          <div className="flex-1">
            <GoArrowLeft
              className="md:hidden"
              size={24}
              onClick={onHandleClick}
            />
          </div>
          <div className="flex-1 text-center">
            <p className="text-lg font-semibold">{username}</p>
          </div>
          <div className="flex-1 flex justify-end">
            {chatState.activeChat && <DropDownSettings />}
          </div>
        </div>

        <div className="flex flex-row justify-between bg-white h-[70vh]">
          <div
            className={`${
              chatState.activeChat ? 'hidden' : 'flex'
            } flex-col md:flex w-full md:w-2/5  border-r-2 overflow-y-auto`}
          >
            {/* <ChatList /> */}
            <div className="border-b-2 py-4 px-2">
              <h3>Mensajes</h3>
            </div>

            {chatState.users && chatState.users.length > 0 ? (
              chatState.users.map((chat: IChat) => {
                return <UserListItem key={chat.id} chat={chat} />;
              })
            ) : (
              <div className="py-4 px-2 text-gray-500">No tienes mensajes</div>
            )}
          </div>
          <div
            className={`${
              chatState.activeChat ? 'flex' : 'hidden'
            } w-full md:flex flex-col`}
          >
            {chatState.activeChat && (
              <div className=" p-4 flex gap-4 border-b">
                <picture>
                  <img
                    src={chatState.product?.image}
                    alt={chatState.product?.title}
                    width={50}
                    height={50}
                  />
                </picture>
                <div className="flex flex-col items-start">
                  <Link
                    href={`/product/${chatState.product?.slug}`}
                    className="text-lg font-semibold text-start"
                  >
                    {chatState.product?.title}
                  </Link>
                  <span className="text-gray-500">
                    {formatCurrency(chatState.product?.price! * 100 || 0)}
                  </span>
                </div>
              </div>
            )}
            {/* *-·············································· */}
            <div className=" flex-1  overflow-y-scroll">
              {chatState.activeChat ? (
                <ChatWindow />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Selecciona un chat para comenzar
                </div>
              )}
            </div>
            <div className="h-24">
              {chatState.product?.status !== 'Available' ? (
                <div className="p-4 border h-full">
                  <p className="text-base font-bold">
                    El artículo no está disponible
                  </p>
                  <span className="text-sm text-gray-400">
                    El artículo se ha vendido o eliminado
                  </span>
                </div>
              ) : (
                <>
                  {chatState.activeChat && (
                    <ChatInput recipientId={recipientId} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
