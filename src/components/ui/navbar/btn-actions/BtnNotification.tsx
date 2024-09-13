'use client';
import { NotificationContext } from '@/context';
import { useContext, useEffect, useRef, useState } from 'react';
import { ListNotification } from '../notifications';
import Link from 'next/link';
import { BellIcon, EyeDropIcon } from '../../icons';

export const BtnNotification = () => {
  const {
    state: { notifications },
  } = useContext(NotificationContext);

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
        onClick={() => setIsCollapsed((prev) => !prev)}
        type="button"
        data-dropdown-toggle="notification-dropdown"
        className="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100  focus:ring-4 focus:ring-gray-300 "
      >
        <span className="sr-only">View notifications</span>
        {notifications.length > 0 && (
          <span className="w-4 h-4 absolute top-0 right-0 rounded-full bg-cerise-red-500 text-white z-10 text-xs">
            {notifications.length}
          </span>
        )}
        {/* <!-- Bell icon --> */}
        <BellIcon className="w-5 h-5" />
      </button>
      {/* <!-- Dropdown menu --> */}
      <div
        className={`${
          isCollapsed ? 'block' : 'hidden'
        } absolute mt-2 overflow-hidden z-50 w-80 text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg md:right-0 left-1/2 transform -translate-x-1/2 md:translate-x-0 md:left-auto`}
      >
        <div className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 ">
          Notificaciones
        </div>
        <div className="max-h-[50vh] min-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <>
              <p className="flex flex-col justify-center items-center h-full mt-[50%] text-gray-500 text-sm">
                No tienes notificaciones
              </p>
            </>
          ) : (
            <>
              {notifications.map((notification) => (
                <ListNotification
                  key={notification.id}
                  notification={notification}
                  setIsCollapsed={setIsCollapsed}
                />
              ))}
            </>
          )}
        </div>
        <Link
          onClick={() => setIsCollapsed(false)}
          href="/member/notifications"
          className="block py-2 text-base font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100"
        >
          <div className="inline-flex items-center ">
            <EyeDropIcon className="mr-2 w-5 h-5" />
            Ver todos
          </div>
        </Link>
      </div>
    </div>
  );
};
