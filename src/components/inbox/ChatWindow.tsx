import { useContext, useEffect, useRef } from 'react';

import { ChatContext } from '@/context';
import { IMessage } from '@/interfaces';
import { MessageOutgoing } from './MessageOutgoing';
import { MessageIncoming } from './MessageIncoming';
import { useAuthStore } from '@/stores';


export const ChatWindow = () => {
  const { chatState } = useContext(ChatContext);
  const { user } = useAuthStore((state) => state);
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
        msg.from === user?.id ? (
          <MessageIncoming key={msg.id} message={msg} />
        ) : (
          <MessageOutgoing key={msg.id} message={msg} />
        )
      )}
    </div>
  );
};
