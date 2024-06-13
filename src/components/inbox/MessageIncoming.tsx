import { IMessage } from '@/interfaces';
import { formatDateChat } from '@/utils';

type Props = {
  message: IMessage;
};
export const MessageIncoming = ({ message }: Props) => {
  return (
    <>
      <div className="flex justify-end mb-4">
        <div className="flex flex-col">
          <p className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
            {message.message}
          </p>
          <span className="text-xs self-end pr-2">
            {formatDateChat(message.messageDate!)}
          </span>
        </div>
      </div>
    </>
  );
};
