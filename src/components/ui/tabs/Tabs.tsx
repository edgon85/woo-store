'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  username: string;
};

export const Tabs = ({ username }: Props) => {
  const router = useRouter();
  const path = usePathname();

  const [activeTab, setActiveTab] = useState(
    path.includes('ratings') ? 'ratings' : 'products'
  );

  return (
    <div>
      <div className="flex bg-white">
        <button
          className={`flex-grow py-4 text-sm font-semibold text-center ${
            activeTab === 'products'
              ? 'text-cerise-red-700 border-b-4 border-cerise-red-600'
              : 'border-b'
          }`}
          onClick={() => {
            setActiveTab('products');
            router.push(`/member/${username}`);
          }}
        >
          Productos
        </button>
        <button
          className={`flex-grow py-4 text-sm font-semibold text-center ${
            activeTab === 'ratings'
              ? 'text-cerise-red-700 border-b-4 border-cerise-red-600'
              : 'border-b'
          }`}
          onClick={() => {
            setActiveTab('ratings');
            router.push(`/member/${username}/favorites`);
          }}
        >
          Favoritos
        </button>
      </div>
    </div>
  );
};
/*     <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
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
      </div> */

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
