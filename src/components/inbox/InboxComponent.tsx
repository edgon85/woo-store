'use client';

import useWebSocket, { IMessages } from '@/hooks/useWebSocket';
import { useForm } from 'react-hook-form';
import { GoArrowLeft } from 'react-icons/go';

import { ChatList } from './ChatList';
import Link from 'next/link';

type FormMessageData = {
  message: string;
};

export const InboxComponent = () => {
  /*  const { connectionStatus, sendMessage, messages, connect } = useWebSocket(
    process.env.API_BASE_URL!
  );
  const { register, handleSubmit } = useForm<FormMessageData>({
    values: { message: '' },
  });

  const onSubmit = (data: FormMessageData) => {
    if (data.message.trim().length < 0) return;

    sendMessage(data.message);
  }; */

  return (
    <div className='px-4 md:px-0"'>
      <div className="container mx-auto shadow-lg rounded-lg mt-4">
        {/* <!-- headaer --> */}
        <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
          <Link href={'/inbox'} className="font-semibold text-2xl ">
            <GoArrowLeft className=" md:hidden" />
          </Link>
          <div className="w-1/2">
            <p>Luis1994</p>
          </div>
          {/* <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
           
          </div> */}
        </div>
        {/* <!-- end header --> */}
        {/* <!-- Chatting --> */}
        <div className="flex flex-row justify-between bg-white h-[60vh]">
          {/* <!-- chat list --> */}
          <div className=" hidden md:flex flex-col w-full md:w-2/5  border-r-2 overflow-y-auto">
            <ChatList />
          </div>
          {/* <!-- end chat list --> */}
          {/* <!-- message --> */}
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
          {/* <!-- end message --> */}
        </div>
      </div>
    </div>
  );
};
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