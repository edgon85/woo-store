import { IMessage } from '@/interfaces';
import { formatDateChat } from '@/utils';

type Props = {
  message: IMessage;
};

export const MessageOutgoing = ({ message }: Props) => {
  return (
    <>
      <div className="flex justify-start mb-4">
        <div className="flex flex-col">
          <p className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
            {message.message}
          </p>
          <span className="text-xs pl-2">
            {formatDateChat(message.messageDate!)}
          </span>
        </div>
      </div>
    </>
  );
};
