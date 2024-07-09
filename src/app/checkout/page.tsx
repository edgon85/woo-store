import {
  AddressSection,
  OrderBreakdown,
  PackageDeliverySection,
  PaymentSelectSection,
  ProductSection,
} from '@/components';
import { redirect } from 'next/navigation';

import { IAddress, IPaymentMethod, IProductWithOffer } from '@/interfaces';
import {
  checkOfferIsValid,
  getProductBySlug,
  fetchShippingAddress,
  fetchPaymentMethods,
} from '@/actions';
import { ProductStatus } from '@/enums';

type OfferValidationResult = {
  ok: boolean;
  message?: string;
  data?: {
    id: string;
    price: number;
    status: string;
  };
};

export default async function CheckoutPage({
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { transaction, offer } = searchParams;

  if (!transaction) {
    throw redirect('/not-found');
  }

  let product = (await getProductBySlug(`${transaction}`)) as IProductWithOffer;
  const addresses = await fetchShippingAddress();
  const paymentMethods = (await fetchPaymentMethods()) as IPaymentMethod[];

  let offerValidation: OfferValidationResult = { ok: true };
  const isReserved = offer === 'true';

  if (isReserved) {
    offerValidation = await checkOfferIsValid(product.user?.id!, product.id!);

    if (!offerValidation.ok) {
      return (
        <p>
          {offerValidation.message ||
            'No tienes permiso para ver esta oferta o la oferta no existe'}
        </p>
      );
    }

    // Si la oferta es válida, adjuntamos la información de la oferta al producto
    if (offerValidation.data) {
      product = {
        ...product,
        offerPrice: offerValidation.data.price,
        offerId: offerValidation.data.id,
        offerStatus: offerValidation.data.status,
      };
    }
  }

  if (product.status !== ProductStatus.Available && !isReserved) {
    return <p>Producto ya no esta disponible</p>;
  }

  return (
    <div className="main-wrapper flex flex-col sm:flex-row">
      <div className="w-full lg:w-3/4 p-2 flex flex-col gap-2">
        <ProductSection product={product} />
        <AddressSection addresses={addresses} />

        <PaymentSelectSection paymentMethods={paymentMethods} />
        <PackageDeliverySection
          packagesDeliveriesIds={product.packageDelivery.map((item) => item.id)}
        />
      </div>
      <div className="w-full lg:w-2/5 p-2">
        <OrderBreakdown
          product={product}
          address={
            addresses.length === 0
              ? null
              : addresses.find((address: IAddress) => address.isPrimary)
          }
        />
      </div>
    </div>
  );
}
