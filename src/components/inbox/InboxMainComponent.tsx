'use client';
import { IChat } from '@/interfaces';
import { useContext } from 'react';
import { ChatContext } from '@/context';
import { UserListItem } from './UserListItem';
import { ChatWindow } from './ChatWindow';
import { ChatInput } from './ChatInput';

type Props = {
  recipientId?: string;
};

export const InboxMainComponent = ({ recipientId = '' }: Props) => {
  const { chatState } = useContext(ChatContext);

  return (
    <div className="main-wrapper min-h-[70vh] p-4 md:p-0">
      <div className="flex flex-row justify-between bg-white h-[60vh] mt-4">
        <div className=" flex flex-col w-full md:w-2/5  border-r-2 overflow-y-auto">
          {/* <ChatList /> */}
          <div className="border-b-2 py-4 px-2">
            <h3>Mensajes</h3>
          </div>

          {chatState.users && chatState.users.length > 0 ? (
            chatState.users.map((chat: IChat) => {
              // console.log(chat);
              return <UserListItem key={chat.id} chat={chat} />;
            })
          ) : (
            <div className="py-4 px-2 text-gray-500">No tienes mensajes</div>
          )}
        </div>
        <div className="hidden md:flex w-full px-5 flex-col justify-between overflow-y-auto">
          <div className="flex flex-col justify-center items-center h-full">
            <div className="w-full px-5 flex flex-col justify-between">
              <div className="flex flex-col mt-5 h-full overflow-y-auto">
                {chatState.activeChat ? (
                  <ChatWindow />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Selecciona un chat para comenzar
                  </div>
                )}
              </div>

              {chatState.activeChat && (
                <div className="py-5">
                  <ChatInput recipientId={recipientId} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
