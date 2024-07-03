import { NotificationContext, SocketContext } from '@/context';
import { useContext, useEffect, useRef, useState } from 'react';
import { BellIcon } from '../../icons';
import { EmptyNotifications } from './EmptyNotifications';
import { ListNotification } from './ListNotification';
import { useRouter } from 'next/navigation';
import { BtnSeeAll } from './BtnSeeAll';

export const DropDownNotification = () => {
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
    <div className="relative flex flex-col items-center " ref={ref}>
      <button
        onClick={() => setIsCollapsed((prev) => !prev)}
        id="dropdownDividerButton"
        data-dropdown-toggle="dropdownDivider"
        className="relative bg-gray-200 hover:bg-gray-300 text-black font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
        type="button"
      >
        {notifications.length > 0 && (
          <span className="w-4 h-4 absolute top-0 right-0 rounded-full bg-cerise-red-500 text-white z-10 text-xs">
            {notifications.length}
          </span>
        )}
        <BellIcon />
      </button>
      {isCollapsed && (
        <div
          id="dropdownDivider"
          className="z-10 absolute top-12 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow min-w-96"
        >
          <ul
            className="pt-2 text-sm text-gray-700"
            aria-labelledby="dropdownDividerButton"
          >
            {notifications.length === 0 ? (
              <>
                <EmptyNotifications />
                <BtnSeeAll setIsCollapsed={setIsCollapsed} />
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
                <BtnSeeAll setIsCollapsed={setIsCollapsed} />
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
