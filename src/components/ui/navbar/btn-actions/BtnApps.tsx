'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';

import { useInboxStore } from '@/stores';
import useNotifications from '@/hooks/useInbox';
import { ChatContext, SocketContext } from '@/context';
import {
  CashIcon,
  MessagesIcon,
  OfferIcon,
  PackageExport,
  WalletIcon,
  PackageImport,
  SquaresIcon,
} from '../../icons';

export const BtnApps = () => {
  const { socket } = useContext(SocketContext);
  // const { dispatch } = useContext(ChatContext);

  // const router = useRouter();

  const { unreadCount } = useInboxStore();

  useNotifications(socket);

  /* const onHandleClickMessages = async () => {
    router.push('/inbox');
    dispatch({ type: '[Chat] - DELETE_CHAT_ACTIVE' });
    setIsCollapsed(false);
  }; */

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
        className="relative p-2 text-gray-500 rounded-lg hover:text-gray-700 hover:bg-gray-100  focus:ring-4 focus:ring-gray-300"
      >
        <span className="sr-only">View notifications</span>
        {unreadCount > 0 ? (
          <span className="w-4 h-4 absolute top-0 right-0 rounded-full bg-cerise-red-500 text-white z-10 text-xs">
            {unreadCount}
          </span>
        ) : null}
        {/* <!-- Icon --> */}
        <SquaresIcon className="w-4 h-4" />
      </button>
      {/* <!-- Dropdown menu --> */}
      <div
        className={`${
          isCollapsed ? 'block' : 'hidden'
        } absolute z-50 mt-2 w-80 max-w-sm overflow-hidden bg-white rounded divide-y divide-gray-100 shadow-lg text-base list-none my-4 md:right-0 left-3/4 transform -translate-x-3/4 md:translate-x-0 md:left-auto`}
        id="apps-dropdown"
      >
        <div className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 ">
          Opciones
        </div>
        <div className="grid grid-cols-3 gap-4 p-4">
          {/* <button
            onClick={onHandleClickMessages}
            className="relative p-4 text-center rounded-lg hover:bg-gray-100 group"
          >
            <MessagesIcon className="mx-auto mb-2 w-5 h-5 text-gray-700 group-hover:text-gray-500" />
            {unreadCount > 0 ? (
              <span className="w-4 h-4 absolute top-0 right-0 rounded-full bg-cerise-red-500 text-white z-10 text-xs">
                {unreadCount}
              </span>
            ) : null}
            <div className="text-sm font-medium text-gray-700">
              Mis Mensajes
            </div>
          </button> */}
          <Link
            onClick={() => setIsCollapsed(false)}
            href={`/settings/transactions/purchases`}
            className="block p-4 text-center rounded-lg hover:bg-gray-100 group"
          >
            <PackageImport className="mx-auto mb-2 w-5 h-5 text-gray-700 group-hover:text-gray-500" />
            <div className="text-sm font-medium text-gray-700">Mis pedidos</div>
          </Link>
          <Link
            onClick={() => setIsCollapsed(false)}
            href={`/settings/transactions/sales`}
            className="block p-4 text-center rounded-lg hover:bg-gray-100 group"
          >
            <PackageExport className="mx-auto mb-2 w-5 h-5 text-gray-700 group-hover:text-gray-500" />
            <div className="text-sm font-medium text-gray-700">Mis ventas</div>
          </Link>
          <Link
            onClick={() => setIsCollapsed(false)}
            href={`/settings/offers`}
            className="block p-4 text-center rounded-lg hover:bg-gray-100 group"
          >
            <OfferIcon className="mx-auto mb-2 w-5 h-5 text-gray-700 group-hover:text-gray-500" />

            <div className="text-sm font-medium text-gray-700">
              Ofertas recibidas
            </div>
          </Link>
          <Link
            onClick={() => setIsCollapsed(false)}
            href={`/settings/balance`}
            className="block p-4 text-center rounded-lg hover:bg-gray-100 group"
          >
            <WalletIcon className="mx-auto mb-2 w-5 h-5 text-gray-700 group-hover:text-gray-500" />
            <div className="text-sm font-medium text-gray-700">Mi balance</div>
          </Link>
          <Link
            onClick={() => setIsCollapsed(false)}
            href={`/settings/payments/payout-methods`}
            className="block p-4 text-center rounded-lg hover:bg-gray-100 group"
          >
            <CashIcon className="mx-auto mb-2 w-5 h-5 text-gray-700 group-hover:text-gray-500" />
            <div className="text-sm font-medium text-gray-700">Mis cobros</div>
          </Link>
        </div>
      </div>
    </div>
  );
};
