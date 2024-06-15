'use client';
import { IChat } from '@/interfaces';
import { useContext } from 'react';
import { ChatContext } from '@/context';
import { UserListItem } from './UserListItem';
import { ChatWindow } from './ChatWindow';
import { ChatInput } from './ChatInput';
import { GoArrowLeft } from 'react-icons/go';
import { useRouter } from 'next/navigation';

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
          <GoArrowLeft
            size={24}
            className="md:hidden"
            onClick={onHandleClick}
          />
          <div className="flex-1 text-center">
            <p className="text-lg font-semibold">{username}</p>
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
              {chatState.activeChat && <ChatInput recipientId={recipientId} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
