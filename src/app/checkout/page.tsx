import {
  AddressSection,
  OrderBreakdown,
  PackageDeliverySection,
  PaymentSelectSection,
  ProductSection,
} from '@/components';
import { redirect } from 'next/navigation';

import {
  fetchPackageDelivery,
  fetchPaymentMethods,
  fetchShippingAddress,
  getProductBySlug,
} from '@/lib';
import { IAddress } from '@/interfaces';

export default async function CheckoutPage({
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { transaction } = searchParams;

  if (!transaction) {
    throw redirect('/not-found');
  }

  const product = await getProductBySlug(`${transaction}`);
  const addresses = await fetchShippingAddress();
  const paymentMethods = await fetchPaymentMethods();
  // const packagesDelivery = await fetchPackageDelivery();

  if (product.status !== 'Available') {
    return <p>Producto ya no esta disponible</p>;
  }

  return (
    <div className="main-wrapper flex flex-col sm:flex-row">
      <div className="w-full lg:w-3/4 p-2 flex flex-col gap-2">
        <ProductSection product={product} />
        <AddressSection addresses={addresses} />

        <PaymentSelectSection paymentMethods={paymentMethods} />
        <PackageDeliverySection
          packagesDeliveriesIds={product.packageDelivery}
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
