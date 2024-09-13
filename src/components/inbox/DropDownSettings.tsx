'use client';

import { archivedChat, getInboxChats } from '@/actions';
import { ChatContext } from '@/context';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';

import { ArchiveIcon, ThreeDots } from '../ui';

export const DropDownSettings = () => {
  const { chatState, dispatch } = useContext(ChatContext);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  const onHandleClick = async () => {
    const { ok } = await archivedChat(chatState.activeChat!, true);

    if (!ok) {
      console.log('Error al archivar el chat');
      return;
    }

    dispatch({ type: '[Chat] - DELETE_CHAT_ACTIVE' });

    const { ok: okListChats, data: usuarios } = await getInboxChats();

    if (okListChats) {
      dispatch({
        type: '[Chat] - cargar-usuarios',
        payload: usuarios,
      });
    }

    setIsCollapsed(false);
    router.push('/inbox');
  };

  return (
    <>
      <div className="relative flex flex-col items-center " ref={ref}>
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          id="dropdownDividerButton"
          data-dropdown-toggle="dropdownDivider"
          className="bg-gray-200 hover:bg-gray-300 text-black font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
          type="button"
        >
          <ThreeDots />
        </button>

        {isCollapsed && (
          <div
            id="dropdownDivider"
            className="z-10 absolute top-10 right-6 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
          >
            <ul
              className="py-2 text-sm text-gray-700"
              aria-labelledby="dropdownDividerButton"
            >
              <button
                onClick={onHandleClick}
                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"
              >
                <span className="mr-2">
                  <ArchiveIcon />
                </span>
                Archivar
              </button>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
