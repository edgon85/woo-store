import {
  AddressSection,
  OrderBreakdown,
  PackageDeliverySection,
  PaymentSelectSection,
  ProductSection,
} from '@/components';
import { getProductBySlug } from '@/helpers';
import { redirect } from 'next/navigation';

import { fetchPackageDelivery } from '@/lib/data';

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
  const addresses = await fetchPackageDelivery();

  if (!product.available) {
    return <p>Producto ya no esta disponible</p>;
  }

  return (
    <div className="main-wrapper flex flex-col sm:flex-row">
      <div className="w-full lg:w-3/4 p-2 flex flex-col gap-2">
        <ProductSection product={product} />
        <AddressSection addresses={addresses} />

        <PaymentSelectSection />
        <PackageDeliverySection />
      </div>
      <div className="w-full lg:w-2/5 p-2">
        <OrderBreakdown />
      </div>
    </div>
  );
}
