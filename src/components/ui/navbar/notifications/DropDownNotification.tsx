import { SocketContext } from '@/context';
import { useContext, useEffect, useRef, useState } from 'react';
import { BellIcon } from '../../icons';

export const DropDownNotification = () => {
  const { notifications, markNotificationAsRead } = useContext(SocketContext);

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
    <div className="relative flex flex-col items-center " ref={ref}>
      <button
        onClick={() => setIsCollapsed((prev) => !prev)}
        id="dropdownDividerButton"
        data-dropdown-toggle="dropdownDivider"
        className="bg-gray-200 hover:bg-gray-300 text-black font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
        type="button"
      >
        <BellIcon />
      </button>
      {isCollapsed && (
        <div
          id="dropdownDivider"
          className="z-10 absolute top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 "
        >
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownDividerButton"
          >
            {notifications.map((notification) => (
              <li key={notification.id}>
                <button
                  // onClick={() => markNotificationAsRead(notification.id)}
                  className="flex items-center justify-between w-full p-2 hover:bg-gray-100"
                >
                  <span>{notification.message}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
