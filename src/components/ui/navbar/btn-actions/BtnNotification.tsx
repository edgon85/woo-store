'use client';
import { NotificationContext } from '@/context';
import { useContext, useEffect, useRef, useState } from 'react';
import { ListNotification } from '../notifications';
import Link from 'next/link';

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
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 14 20"
        >
          <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
        </svg>
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
            <svg
              aria-hidden="true"
              className="mr-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            Ver todos
          </div>
        </Link>
      </div>
    </div>
  );
};
