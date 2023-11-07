import {
  AddressSection,
  OrderBreakdown,
  PackageDeliverySection,
  PaymentSelectSection,
  ProductSection,
} from '@/components';
import { getProductBySlug } from '@/helpers';
import { redirect } from 'next/navigation';

import { cookies } from 'next/headers';
import { fetchPackageDelivery } from '@/lib/data';

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { transaction } = searchParams;
  const token = cookies().get('token')?.value;

  if (!transaction) {
    throw redirect('/not-found');
  }
  const product = await getProductBySlug(`${transaction}`);
  const addresses = await fetchPackageDelivery(token!);

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

/* 'use client';

import { useAuth, useLoadingData } from '@/hooks';
import { redirect, useSearchParams } from 'next/navigation';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { data, loading, errorMessage } = useLoadingData(
    '/shipping-address',
    user?.token
  );

  const transaction_id = searchParams.get('transaction');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  if (data?.length === 0) {
    redirect(`/checkout/address?transaction=${transaction_id}`);
  } else {
    redirect(`/checkout/payment?transaction=${transaction_id}`);
  }
}
 */
