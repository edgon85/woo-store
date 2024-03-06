'use client';

import { addToFavorite, deleteToFavorite, getCheckIsFavorite } from '@/actions';
import { useAuth } from '@/hooks';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsHeart, BsHeartFill, BsShare } from 'react-icons/bs';
import { ShareButton } from './share/ShareButton';
type Props = {
  productId: string;
  productName: string;
  productPrice: number;
};

export const BtnActions = ({ productId, productName, productPrice }: Props) => {
  const path = usePathname();
  const { user, isLoggedIn } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkIsFavorite = async () => {
      try {
        const data = await getCheckIsFavorite(productId, user?.token!);
        setIsFavorite(data.isFavorite);
      } catch (error: any) {
        console.error(
          'Error al obtener el estado de favoritos:',
          error.message
        );
      }
    };
    checkIsFavorite();
  }, [productId, user?.token]);

  const toggleFavorite = async () => {
    if (isFavorite) {
      await deleteToFavorite(productId, user?.token!);
      setIsFavorite(false);
    } else {
      await addToFavorite(productId, user?.token!);
      setIsFavorite(true);
    }
  };

  return (
    <div className="flex justify-evenly items-center gap-4 py-8">
      {!isLoggedIn ? (
        <Link
          href={`/auth/login?p=${path}`}
          className="flex justify-center items-center gap-2"
        >
          <BsHeart className="text-cerise-red-600" size={24} />
          <span className="text-xs">Añadir a favoritos</span>
        </Link>
      ) : (
        <button
          onClick={toggleFavorite}
          className="flex justify-center items-center gap-2"
        >
          {isFavorite ? (
            <>
              <BsHeartFill className="text-cerise-red-600" size={24} />
              <span className="text-xs">Eliminar de favoritos</span>
            </>
          ) : (
            <>
              <BsHeart className="text-cerise-red-600" size={24} />
              <span className="text-xs">Añadir a favoritos</span>
            </>
          )}
        </button>
      )}

      {/* <button className="flex justify-center items-center gap-2">
        <BsShare className="text-cerise-red-600" size={24} />{' '}
        <span>Compartir</span>
      </button> */}
      <ShareButton productName={productName} productPrice={productPrice} />
    </div>
  );
};

/* 
 {!isLoggedIn ? (
        <button
          onClick={() => console.log(productId)}
          className="flex justify-center items-center gap-2"
        >
          <BsHeart className="text-cerise-red-600" size={24} />{' '}
          <span className="text-xs">Añadir a favoritos</span>
        </button>
      ) : (
        <button
          onClick={() => console.log('delete to favorites')}
          className="flex justify-center items-center gap-2"
        >
          <BsHeartFill className="text-cerise-red-600" size={24} />{' '}
          <span className="text-xs">Eliminar de favoritos</span>
        </button>
      )}
*/
