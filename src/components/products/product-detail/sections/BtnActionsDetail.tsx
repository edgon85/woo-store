'use client';
import { TooltipIcon } from '@/components/ui';
import { IProduct } from '@/interfaces';
import { ActionButton } from '../../product-card';
import { BtnMakeOffer } from './BtnMakeOffer';
import { ModalSendMessage } from './ModalSendMessage';

type ActionsProps = {
  product: IProduct;
  currentUserId: string;
};

export const BtnActionsDetail = ({ product, currentUserId }: ActionsProps) => {
  return (
    <>
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
            {/*   <button
            onClick={handleSendMessage}
            className="w-full border border-cerise-red-700 text-cerise-red-700 text-sm hover:bg-cerise-red-500 hover:text-white rounded flex justify-center items-center py-2"
            >
            Enviar mensaje
          </button> */}
            <ModalSendMessage
              recipientId={product.user?.id!}
              recipientUsername={product.user?.username!}
              productId={product.id!}
              slug={product.slug!}
              title={product.title!}
            />
          </>
        )}
      </section>
    </>
  );
};

/* 
 const initialMessage = `Hola, estoy interesado en tu producto ${product.title}.`;
    setPendingMessage(initialMessage);


    const { data, ok, message } = await getChatForUser(product.user?.id!);

    console.log('data', data);

    if (data) {
      addChat(data);
      selectChat(data.id);

      router.push(
        `/inbox/${data.id || ''}?username=${
          product.user?.username || ''
        }`
      );
    } else {
      const newChat: IChat = {
        id: product.user?.id || '',
        lastMessage: '',
        messages: [],
        chatInboxDate: new Date().toISOString(),
        user: {
          id: currentUserId,
          username: '',
          avatar: '',
        },
        recipient: {
          id: product.user?.id || '',
          username: product.user?.username || '',
          avatar: product.user?.profileImage || '',
        },
      };

      addChat(newChat);
      selectChat(newChat.id);
      router.push(
        `/inbox/${product.user?.id || ''}?username=${
          product.user?.username || ''
        }`
      );
    }

    
*/
