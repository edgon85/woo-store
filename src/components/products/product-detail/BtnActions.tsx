'use client';

import { addToFavorite, deleteToFavorite, getCheckIsFavorite } from '@/actions';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ShareButton } from './share/ShareButton';
import { useAuthStore } from '@/stores';
import { FillHeart, HeartIcon } from '@/components/ui';
type Props = {
  productId: string;
  productName: string;
  productPrice: number;
};

export const BtnActions = ({ productId, productName, productPrice }: Props) => {
  const path = usePathname();
  const { isLoggedIn } = useAuthStore((state) => state);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkIsFavorite = async () => {
      try {
        const data = await getCheckIsFavorite(productId);
        setIsFavorite(data.isFavorite);
      } catch (error: any) {
        console.error(
          'Error al obtener el estado de favoritos:',
          error.message
        );
      }
    };
    checkIsFavorite();
  }, [productId]);

  const toggleFavorite = async () => {
    if (isFavorite) {
      await deleteToFavorite(productId);
      setIsFavorite(false);
    } else {
      await addToFavorite(productId);
      setIsFavorite(true);
    }
  };

  return (
    <div className="flex justify-evenly items-center gap-4 py-2 md:py-4">
      {!isLoggedIn ? (
        <Link
          href={`/auth/login?p=${path}`}
          className="flex justify-center items-center gap-2"
        >
          <HeartIcon className="w-6 h-6 text-cerise-red-600" />
          <span className="text-xs">Añadir a favoritos</span>
        </Link>
      ) : (
        <button
          onClick={toggleFavorite}
          className="flex justify-center items-center gap-2"
        >
          {isFavorite ? (
            <>
              <FillHeart className="w-6 h-6 text-cerise-red-600" />
              <span className="text-xs">Eliminar de favoritos</span>
            </>
          ) : (
            <>
              <HeartIcon className="w-6 h-6 text-cerise-red-600" />
              <span className="text-xs">Añadir a favoritos</span>
            </>
          )}
        </button>
      )}

      <ShareButton productName={productName} productPrice={productPrice} />
    </div>
  );
};
