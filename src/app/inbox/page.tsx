import { ChatList } from '@/components/inbox/ChatList';
import { GoArrowLeft } from 'react-icons/go';

export default function InboxPage() {
  return (
    <div className="main-wrapper min-h-[70vh] p-4 md:p-0">
      <div className="flex flex-row justify-between bg-white h-[60vh] mt-4">
        <div className=" flex flex-col w-full md:w-2/5  border-r-2 overflow-y-auto">
          <ChatList />
        </div>
        <div className="hidden md:flex w-full px-5 flex-col justify-between overflow-y-auto">
          <div className="flex flex-col justify-center items-center h-full">
            <p>Seleccione un mensaje</p>
          </div>
        </div>
      </div>
    </div>
  );
}
