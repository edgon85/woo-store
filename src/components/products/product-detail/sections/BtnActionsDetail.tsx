'use client';
import { TooltipIcon } from '@/components/ui';
import { IProduct } from '@/interfaces';
import { IChat, useInboxStore } from '@/stores';
import { useRouter } from 'next/navigation';
import { ActionButton } from '../../product-card';
import { BtnMakeOffer } from './BtnMakeOffer';

type ActionsProps = {
  product: IProduct;
  currentUserId: string;
};

export const BtnActionsDetail = ({ product, currentUserId }: ActionsProps) => {
  const router = useRouter();
  const { addChat, selectChat } = useInboxStore();

  const handleSendMessage = () => {
    let chat = useInboxStore
      .getState()
      .chats.find((chat) => chat.participants.includes(product.user?.id!));

    if (!chat) {
      chat = {
        id: product.user?.id || '',
        username: product.user?.username || '',
        profilePicture: product.user?.profileImage || '',
        lastMessage: 'Hola, ¿en qué puedo ayudarte?',
        timestamp: new Date().toISOString(),
        fullName: '',
        participants: [currentUserId, product.user?.id!], // Reemplaza 'user-id' con el ID real del usuario
        messages: [
          {
            id: 'uuidv4()',
            content: 'Hola, ¿está disponible?',
            senderId: 'user-id', // Reemplaza con el ID real del usuario
            recipientId: product.user?.id!,
            timestamp: new Date().toISOString(),
          },
        ],
      };
      addChat(chat);
    }

    selectChat(chat.id);

    router.push(`/inbox/${chat.id}?username=${chat.username}`);
  };

  return (
    <section className=" flex flex-col gap-4">
      <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
        <span>Envíos a todo el país</span>
        <span>|</span>
        <span>Protección al comprador</span>
        <TooltipIcon />
      </div>
      <ActionButton product={product} currentUserId={currentUserId} />
      {currentUserId !== product.user?.id && (
        <>
          <BtnMakeOffer product={product} />
          <button
            onClick={handleSendMessage}
            className="w-full border border-cerise-red-700 text-cerise-red-700 text-sm hover:bg-cerise-red-500 hover:text-white rounded flex justify-center items-center py-2"
          >
            Enviar mensaje
          </button>
        </>
      )}
    </section>
  );
};
