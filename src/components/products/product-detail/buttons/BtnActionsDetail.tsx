'use client';
import Link from 'next/link';

import { TooltipIcon } from '@/components/ui';
import { IProduct } from '@/interfaces';

import { BtnMakeOffer, BtnSendMessage, BtnBuyOrEdit } from './';
import { ProductStatus } from '@/enums';
import { CurrentUserReservedContent } from './CurrentUserReservedContent';

type ActionsProps = {
  product: IProduct;
  currentUserId: string;
};
type ActionContentProps = {
  product: IProduct;
  currentUserId: string;
  isOwner: boolean;
  isReserved?: boolean;
  isAvailable?: boolean;
  isReservedForCurrentUser?: boolean;
};

export const BtnActionsDetail = ({ product, currentUserId }: ActionsProps) => {
  const isAvailable = product.status === ProductStatus.Available;
  const isReserved = product.status === ProductStatus.Reserved;
  // const isPendingPayment = product.status === 'pending_payment';
  const isOwner = currentUserId === product.user?.id;
  const isReservedForCurrentUser =
    product.reservedFor?.userId === currentUserId;

  return (
    <section className="flex flex-col gap-4">
      <ShippingInfo />
      <ActionContent
        product={product}
        currentUserId={currentUserId}
        isOwner={isOwner}
        isReserved={isReserved}
        // isPendingPayment={isPendingPayment}
        isAvailable={isAvailable}
        isReservedForCurrentUser={isReservedForCurrentUser}
      />
    </section>
  );
};

// ShippingInfo.tsx
const ShippingInfo = () => (
  <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
    <span>Envíos a todo el país</span>
    <span>|</span>
    <span>Protección al comprador</span>
    <TooltipIcon />
  </div>
);

// ActionContent.tsx
const ActionContent = ({
  product,
  currentUserId,
  isOwner,
  isReserved,
  isAvailable,
  isReservedForCurrentUser,
}: ActionContentProps) => {
  if (isAvailable) {
    return (
      <AvailableProduct
        product={product}
        currentUserId={currentUserId}
        isOwner={isOwner}
      />
    );
  }
  if (
    isReserved ||
    [
      ProductStatus.Sold,
      ProductStatus.UnderReview,
      ProductStatus.PendingPayment,
    ].includes(product.status as ProductStatus)
  ) {
    return (
      <ReservedProduct
        product={product}
        isOwner={isOwner}
        isReservedForCurrentUser={isReservedForCurrentUser!}
        // isPendingPayment={isPendingPayment}
      />
    );
  }
  return <UnavailableProduct />;
};

// AvailableProduct.tsx
const AvailableProduct = ({
  product,
  currentUserId,
  isOwner,
}: {
  product: IProduct;
  currentUserId: string;
  isOwner: boolean;
}) => (
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
);

// ReservedProduct.tsx
const ReservedProduct = ({
  product,
  isOwner,
  isReservedForCurrentUser,
}: {
  product: IProduct;
  isOwner: boolean;
  isReservedForCurrentUser: boolean;
}) => (
  <div className="py-8">
    {isOwner ? (
      <OwnerReservedMessage product={product} />
    ) : isReservedForCurrentUser ? (
      <CurrentUserReservedContent
        product={product}
        isPendingPayment={[
          ProductStatus.Sold,
          ProductStatus.UnderReview,
          ProductStatus.PendingPayment,
        ].includes(product.status as ProductStatus)}
      />
    ) : (
      <OtherUserReservedMessage />
    )}
  </div>
);

// OwnerReservedMessage.tsx
const OwnerReservedMessage = ({ product }: { product: IProduct }) => {
  return (
    <>
      {product.status === ProductStatus.Reserved ? (
        <div className="w-full flex flex-col justify-center items-center">
          <Link
            href={`/settings/transactions/sales`}
            className="text-center text-sm text-yellow-600"
          >
            Este producto está reservado para {product.reservedFor?.fullName} (
            {product.reservedFor?.username})
          </Link>
          <p className="text-xs text-gray-400 text-center">
            tiene 24hrs para hacer la compra de lo contrario el producto vuelve
            a estar disponible
          </p>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <Link
            href={`/settings/transactions/sales`}
            className="text-center text-sm text-yellow-600"
          >
            Este producto ya fue comprado
          </Link>
        </div>
      )}
    </>
  );
};


// OtherUserReservedMessage.tsx
const OtherUserReservedMessage = () => (
  <p className="text-center text-sm text-cerise-red-600">
    Este producto ya no está disponible
  </p>
  //Este producto está reservado para otro usuario
);

// UnavailableProduct.tsx
const UnavailableProduct = () => (
  <div className="py-8">
    <p className="text-center text-sm text-cerise-red-600">
      Este producto ya no está disponible
    </p>
  </div>
);

