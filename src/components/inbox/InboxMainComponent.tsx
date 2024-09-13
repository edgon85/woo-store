'use client';
import { IChat } from '@/interfaces';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ChatContext } from '@/context';
import { UserListItem } from './UserListItem';
import { ChatWindow } from './ChatWindow';
import { ChatInput } from './ChatInput';

import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/utils';
import Link from 'next/link';
import { DropDownSettings } from './DropDownSettings';
import { ProductStatus } from '@/enums';
import { ArrowLeftIcon } from '../ui';
import { checkIsBuyer } from '@/actions';

type Props = {
  recipientId?: string;
  username?: string;
  currentUserId: string;
};

export const InboxMainComponent = ({
  recipientId = '',
  username = '',
  currentUserId,
}: Props) => {
  const { chatState, dispatch } = useContext(ChatContext);
  const router = useRouter();
  const [isBuyer, setIsBuyer] = useState(false);

  const isProductOwner = chatState.product?.userId === currentUserId;

  const checkBuyerStatus = useCallback(async () => {
    if (!recipientId || !chatState.product) return;

    console.log('reviso si es comprador');
    const { data } = await checkIsBuyer(chatState.product.id);

    setIsBuyer(data.isBuyer);
  }, [chatState.product, recipientId]);

  useEffect(() => {
    if (isProductOwner) return;

    if (chatState.product && !isProductOwner) {
      checkBuyerStatus();
    } else {
      setIsBuyer(false);
    }
  }, [chatState.product, isProductOwner, checkBuyerStatus]);

  const canAccessChat = isProductOwner || isBuyer;

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
          <div className="flex-1" onClick={onHandleClick}>
            <ArrowLeftIcon className="md:hidden" />
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
            {chatState.activeChat && (
              <div className="h-24">
                {chatState.product?.status !== ProductStatus.Available &&
                !canAccessChat ? (
                  <div className="p-4 border h-full">
                    <p className="text-base font-bold">
                      El artículo no está disponible
                    </p>
                    <span className="text-sm text-gray-400">
                      El artículo se ha vendido o eliminado
                    </span>
                  </div>
                ) : (
                  <ChatInput recipientId={recipientId} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
