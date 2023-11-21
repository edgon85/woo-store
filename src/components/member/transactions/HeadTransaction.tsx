'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export const HeadTransaction = () => {
  const path = usePathname();
  let initialTab = 'purchases';
  if (path.includes('sales')) {
    initialTab = 'sales';
  } else {
    initialTab = 'purchases';
  }

  const [activeTab, setActiveTab] = useState(initialTab);
  const router = useRouter();

  const handleOnClick = (tab: string) => {
    setActiveTab(tab);
    router.push(`/member/transactions/${tab}`);
  };
  return (
    <div className="px-4 lg:px-0 main-wrapper pt-4 pb-4">
      <div className="flex border-b">
        <button
          className={`flex-grow py-2 px-4 text-sm font-semibold ${
            activeTab === 'purchases'
              ? 'text-darkPrimary border-b-2 border-primary'
              : ''
          }`}
          onClick={() => handleOnClick('purchases')}
        >
          Mis Compras
        </button>
        <button
          className={`flex-grow py-2 px-4 text-sm font-semibold ${
            activeTab === 'sales'
              ? 'text-darkPrimary border-b-2 border-primary'
              : ''
          }`}
          onClick={() => handleOnClick('sales')}
        >
          Mis ventas
        </button>
      </div>
    </div>
  );
};
