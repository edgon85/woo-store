'use client';

import { useSidebar } from '@/stores';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ClothingOptions = [
  { id: 'ropa', slug: 'ropa', name: 'Ropa' },
  { id: 'zapatos', slug: 'zapatos', name: 'Zapatos' },
  { id: 'accesorios', slug: 'accesorios', name: 'Accesorios' },
];

type Props = {
  gender: string;
  isMobile?: boolean;
};

export const ClothingType = ({ gender, isMobile = false }: Props) => {
  const router = useRouter();
  const menuFilter = useSidebar((state) => state.onSidebarFilterOpen);
  const [selectedItem, setSelectedItem] = useState<string | null>('ropa');

  const onHandleClick = (slug: string) => {
    setSelectedItem(slug);
    router.push(`/catalog/${gender}/${slug}`);
    if (isMobile) menuFilter();
  };

  return (
    <div className="divide-y divide-gray-300">
      {ClothingOptions.map((clothing) => (
        <li key={clothing.id} className="p-4">
          <button
            onClick={() => onHandleClick(clothing.slug)}
            className={clsx({
              'text-cerise-red-600': selectedItem === clothing.slug,
              'text-gray-700': selectedItem !== clothing.slug,
            })}
          >
            {clothing.name}
          </button>
        </li>
      ))}
    </div>
  );
};
