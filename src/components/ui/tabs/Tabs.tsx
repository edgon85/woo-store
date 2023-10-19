'use client';

import { useAuth } from '@/hooks';
import { ListItemProps } from '@/interfaces';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  ListOfTabs: ListItemProps[];
};

export const Tabs = ({ ListOfTabs }: Props) => {
  const pathName = usePathname();
  

  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
      <ul className="flex flex-wrap -mb-px">
        {ListOfTabs.map((tab) => (
          <li key={tab.href} className="mr-2">
            <Link
              href={tab.href}
              className={`inline-block p-4 border-b-2 ${
                pathName === tab.href
                  ? 'text-black font-bold border-primary'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              } rounded-t-lg`}
            >
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* export const Tabs = ({listItems}: Props) => {
  const pathName = usePathname();
  const { user } = useAuth();

  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200  ">
      <ul className="flex flex-wrap -mb-px">
        <li className="mr-2">
          <Link
            href={`/profile/${user?.id}`}
            className={`inline-block p-4 border-b-2  ${
              pathName === `/profile/${user?.id}`
                ? 'text-black font-bold border-primary'
                : 'border-transparent hover:text-gray-600 hover:border-gray-300'
            } rounded-t-lg`}
          >
            Productos
          </Link>
        </li>
        <li className="mr-2">
          <Link
            href="/profile/wishlist"
            className={`inline-block p-4 border-b-2 ${
              pathName === '/profile/wishlist'
                ? 'text-black font-bold border-primary'
                : 'border-transparent hover:text-gray-600 hover:border-gray-300'
            } rounded-t-lg `}
            // aria-current="page"
          >
            Favoritos
          </Link>
        </li>
      </ul>
    </div>
  );
}; */
