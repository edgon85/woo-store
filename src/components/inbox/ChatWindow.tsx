import { useContext, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';

import { ChatContext } from '@/context';
import { IMessage } from '@/interfaces';
import { MessageOutgoing } from './MessageOutgoing';
import { MessageIncoming } from './MessageIncoming';

export const ChatWindow = () => {
  const { chatState } = useContext(ChatContext);
  const currentId = Cookies.get('userId');
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ajusta el scrollTop al alto del contenido para hacer scroll al final
    const messagesContainer = messagesContainerRef.current;
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [chatState.messages]);

  return (
    <div
      ref={messagesContainerRef}
      className="p-4 space-y-4 overflow-y-scroll h-full"
    >
      {chatState.messages.map((msg: IMessage) =>
        msg.from === currentId ? (
          <MessageIncoming key={msg.id} message={msg} />
        ) : (
          <MessageOutgoing key={msg.id} message={msg} />
        )
      )}
    </div>
  );
};
