'use client';

import useWebSocket from '@/hooks/useWebSocket';
import { GoArrowLeft } from 'react-icons/go';

import { ChatList } from './ChatList';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInboxStore } from '@/stores';
import { ChatWindow } from './ChatWindow';
import { ChatInput } from './ChatInput';

type Props = {
  currentId: string;
  recipientId: string;
  username: string;
};

export const InboxComponent = ({ currentId, username, recipientId }: Props) => {
  /*   const { connectionStatus, sendMessage, messages, connect } = useWebSocket(
    process.env.API_BASE_URL!
  );
  const { register, handleSubmit } = useForm<FormMessageData>({
    values: { message: '' },
  });

  const onSubmit = (data: FormMessageData) => {
    if (data.message.trim().length < 0) return;

    sendMessage(data.message);
  }; */

  const { connect } = useWebSocket('http://localhost:5000');
  const { selectedChatId, chats } = useInboxStore();

  useEffect(() => {
    connect();
  }, [connect]);

  return (
    <div className='px-4 md:px-0"'>
      <div className="container mx-auto shadow-lg rounded-lg mt-4">
        <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
          <Link href={'/inbox'} className="font-semibold text-2xl ">
            <GoArrowLeft className=" md:hidden" />
          </Link>
          <div className="w-1/2">
            <p>{username}</p>
          </div>
        </div>

        <div className="flex flex-row justify-between bg-white h-[60vh]">
          <div className=" hidden md:flex flex-col w-full md:w-2/5  border-r-2 overflow-y-auto">
            <ChatList />
          </div>

          <div className="w-full px-5 flex flex-col justify-between">
            <div className="flex flex-col mt-5 h-full overflow-y-auto">
              {selectedChatId ? (
                <ChatWindow />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Selecciona un chat para comenzar
                </div>
              )}
            </div>
            <div className="py-5">
              <ChatInput currentId={recipientId} recipientId={currentId} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

/* 
 <div className="flex h-screen">
      <div className="w-1/3 border-r border-gray-300">
        <ChatList />
      </div>
      <div className="w-2/3 flex flex-col">
        <div className="p-4 border-b border-gray-300">
          <h1 className="text-xl font-semibold">Estado: {connectionStatus}</h1>
        </div>
        <div className="flex-1">
          {selectedChatId ? (
            <ChatWindow
              currentId={recipientId}
              recipientId={currentId}
              username={username}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Selecciona un chat para comenzar
            </div>
          )}
        </div>
      </div>
    </div>
*/

/* 

 <div className='px-4 md:px-0"'>
      <div className="container mx-auto shadow-lg rounded-lg mt-4">
        {/* <!-- headaer --> * /}
        <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
          <Link href={'/inbox'} className="font-semibold text-2xl ">
            <GoArrowLeft className=" md:hidden" />
          </Link>
          <div className="w-1/2">
            <p>{username}</p>
          </div>
          {/* <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
           
          </div> * /}
        </div>
        {/* <!-- end header --> * /}
        {/* <!-- Chatting --> * /}
        <div className="flex flex-row justify-between bg-white h-[60vh]">
          {/* <!-- chat list --> * /}
          <div className=" hidden md:flex flex-col w-full md:w-2/5  border-r-2 overflow-y-auto">
            <ChatList />
          </div>
          {/* <!-- end chat list --> * /}
          {/* <!-- message --> * /}
          <div className="w-full px-5 flex flex-col justify-between overflow-y-auto">
            <div className="flex flex-col mt-5">
              <div className="flex justify-end mb-4">
                <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                  Welcome to group everyone !
                </div>
              </div>
              <div className="flex justify-start mb-4">
                <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quaerat at praesentium, aut ullam delectus odio error sit rem.
                  Architecto nulla doloribus laborum illo rem enim dolor odio
                  saepe, consequatur quas?
                </div>
              </div>
              <div className="flex justify-end mb-4">
                <div>
                  <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Magnam, repudiandae.
                  </div>

                  <div className="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Debitis, reiciendis!
                  </div>
                </div>
              </div>
              <div className="flex justify-start mb-4">
                <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                  happy holiday guys!
                </div>
              </div>
            </div>
            <div className="py-5">
              <input
                className="w-full bg-gray-300 py-5 px-3 rounded-xl"
                type="text"
                placeholder="type your message here..."
              />
            </div>
          </div>
          {/* <!-- end message --> * /}
        </div>
      </div>
    </div>
*/
/* 

 <button onClick={connect}>Conectar</button>
      <h2>{connectionStatus}</h2>
   
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" id="message" {...register('message')} />
        <button type="submit">Send</button>
      </form>

      <h3>Messages</h3>
      <ul>
        {messages.map((message: IMessages, index) => (
          <li key={index}>
            {message.fullName}: {message.message}
          </li>
        ))}
      </ul>
*/
