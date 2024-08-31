'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';

import { GiCash } from 'react-icons/gi';
import { BiSolidOffer } from 'react-icons/bi';
import { MdAccountBalanceWallet } from 'react-icons/md';
import { TbMessages, TbPackageExport, TbPackageImport } from 'react-icons/tb';

import { useInboxStore } from '@/stores';
import useNotifications from '@/hooks/useInbox';
import { ChatContext, SocketContext } from '@/context';

export const BtnApps = () => {
  const { socket } = useContext(SocketContext);
  const { dispatch } = useContext(ChatContext);

  const router = useRouter();

  const { unreadCount } = useInboxStore();

  useNotifications(socket);

  const onHandleClickMessages = async () => {
    router.push('/inbox');
    dispatch({ type: '[Chat] - DELETE_CHAT_ACTIVE' });
    setIsCollapsed(false);
  };

  const [isCollapsed, setIsCollapsed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (evt: any) => {
      if (isCollapsed && ref.current && !ref.current.contains(evt.target)) {
        setIsCollapsed(false);
      }
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [isCollapsed]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsCollapsed((prev) => !prev)}
        data-dropdown-toggle="apps-dropdown"
        className="relative p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100  focus:ring-4 focus:ring-gray-300"
      >
        <span className="sr-only">View notifications</span>
        {unreadCount > 0 ? (
          <span className="w-4 h-4 absolute top-0 right-0 rounded-full bg-cerise-red-500 text-white z-10 text-xs">
            {unreadCount}
          </span>
        ) : null}
        {/* <!-- Icon --> */}
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 18"
        >
          <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
        </svg>
      </button>
      {/* <!-- Dropdown menu --> */}
      <div
        className={`${
          isCollapsed ? 'block' : 'hidden'
        } absolute right-0 mt-2 w-80 overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg`}
        id="apps-dropdown"
      >
        <div className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 ">
          Opciones
        </div>
        <div className="grid grid-cols-3 gap-4 p-4">
          {/*  <Link
            onClick={() => setIsCollapsed(false)}
            href={`/catalog/mujer`}
            className="block p-4 text-center rounded-lg hover:bg-gray-100 group"
          >
            <IoIosWoman className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500" />
            <div className="text-sm font-medium text-gray-900">Mujeres</div>
          </Link>
          <Link
            onClick={() => setIsCollapsed(false)}
            href={`/catalog/hombre`}
            className="block p-4 text-center rounded-lg hover:bg-gray-100 group"
          >
            <IoIosMan className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500" />
            <div className="text-sm font-medium text-gray-900">Hombres</div>
          </Link>
          <Link
            onClick={() => setIsCollapsed(false)}
            href={`/catalog/accesorios`}
            className="block p-4 text-center rounded-lg hover:bg-gray-100 group"
          >
            <FaSwatchbook className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500" />
            <div className="text-sm font-medium text-gray-900">Accesorios</div>
          </Link> */}
          <button
            onClick={onHandleClickMessages}
            className="relative p-4 text-center rounded-lg hover:bg-gray-100 group"
          >
            <TbMessages className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500" />
            {unreadCount > 0 ? (
              <span className="w-4 h-4 absolute top-0 right-0 rounded-full bg-cerise-red-500 text-white z-10 text-xs">
                {unreadCount}
              </span>
            ) : null}
            <div className="text-sm font-medium text-gray-900">
              Mis Mensajes
            </div>
          </button>
          <Link
            onClick={() => setIsCollapsed(false)}
            href={`/settings/transactions/purchases`}
            className="block p-4 text-center rounded-lg hover:bg-gray-100 group"
          >
            <TbPackageImport className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500" />
            <div className="text-sm font-medium text-gray-900">Mis pedidos</div>
          </Link>
          <Link
            onClick={() => setIsCollapsed(false)}
            href={`/settings/transactions/sales`}
            className="block p-4 text-center rounded-lg hover:bg-gray-100 group"
          >
            <TbPackageExport className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500" />
            <div className="text-sm font-medium text-gray-900">Mis ventas</div>
          </Link>
          <Link
            onClick={() => setIsCollapsed(false)}
            href={`/settings/offers`}
            className="block p-4 text-center rounded-lg hover:bg-gray-100 group"
          >
            <BiSolidOffer className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500" />

            <div className="text-sm font-medium text-gray-900">
              Ofertas recibidas
            </div>
          </Link>
          <Link
            onClick={() => setIsCollapsed(false)}
            href={`/settings/balance`}
            className="block p-4 text-center rounded-lg hover:bg-gray-100 group"
          >
            <MdAccountBalanceWallet className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500" />
            <div className="text-sm font-medium text-gray-900">Mi balance</div>
          </Link>
          <Link
            onClick={() => setIsCollapsed(false)}
            href={`/settings/payments/payout-methods`}
            className="block p-4 text-center rounded-lg hover:bg-gray-100 group"
          >
            <GiCash className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500" />
            <div className="text-sm font-medium text-gray-900">Mis cobros</div>
          </Link>
        </div>
      </div>
    </div>
  );
};
