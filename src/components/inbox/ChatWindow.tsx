import { useContext } from 'react';
import Cookies from 'js-cookie';

import { ChatContext } from '@/context';
import { IMessage } from '@/interfaces';
import { MessageOutgoing } from './MessageOutgoing';
import { MessageIncoming } from './MessageIncoming';

export const ChatWindow = () => {
  const { chatState } = useContext(ChatContext);
  const currentId = Cookies.get('userId');

  return (
    <>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatState.messages.map((msg: IMessage) =>
          msg.from === currentId ? (
            <MessageIncoming key={msg.id} message={msg} />
          ) : (
            <MessageOutgoing key={msg.id} message={msg} />
          )
        )}
      </div>
    </>
  );
};
