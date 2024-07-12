'use client';
import Link from 'next/link';

import { TooltipIcon } from '@/components/ui';
import { IProduct } from '@/interfaces';

import { BtnMakeOffer, BtnSendMessage, BtnBuyOrEdit } from './';
import { ProductStatus } from '@/enums';

type ActionsProps = {
  product: IProduct;
  currentUserId: string;
};

export const BtnActionsDetail = ({ product, currentUserId }: ActionsProps) => {
  const isOwner = currentUserId === product.user?.id;
  const isReserved = product.status === ProductStatus.Reserved;
  const isAvailable = product.status === ProductStatus.Available;
  const isReservedForCurrentUser =
    isReserved && product.reservedFor?.userId === currentUserId;

  return (
    <section className="flex flex-col gap-4">
      <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
        <span>Envíos a todo el país</span>
        <span>|</span>
        <span>Protección al comprador</span>
        <TooltipIcon />
      </div>

      {isAvailable ? (
        <div className="flex flex-col gap-2">
          <BtnBuyOrEdit product={product} currentUserId={currentUserId} />
          {!isOwner && (
            <>
              <BtnMakeOffer product={product} />
              <BtnSendMessage
                recipientId={product.user?.id!}
                recipientUsername={product.user?.username!}
                productId={product.id!}
                slug={product.slug!}
                title={product.title!}
              />
            </>
          )}
        </div>
      ) : isReserved ? (
        <div className="py-8">
          {isOwner ? (
            <p className="text-center text-sm text-yellow-600">
              Este producto está reservado para {product.reservedFor?.fullName}{' '}
              ({product.reservedFor?.username})
            </p>
          ) : isReservedForCurrentUser ? (
            <>
              <p className="text-center text-sm text-green-600 mb-4">
                Este producto está reservado para ti <br />{' '}
                <strong>Tienes 24 hrs para realizar la compra</strong>
              </p>
              <Link
                href={`/checkout?transaction=${product.id}&offer=true`}
                className="bg-cerise-red-600 hover:bg-cerise-red-500 text-white text-sm rounded flex justify-center items-center px-4 py-2"
              >
                Comprar ahora
              </Link>
            </>
          ) : (
            <p className="text-center text-sm text-cerise-red-600">
              Este producto ya no está disponible
            </p>
          )}
        </div>
      ) : (
        <div className="py-8">
          <p className="text-center text-sm text-cerise-red-600">
            Este producto ya no está disponible
          </p>
        </div>
      )}
    </section>
  );
};
