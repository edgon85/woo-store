import { AddressSection, OrderBreakdown } from '@/components';

export default function CheckoutPage() {
  return (
    <div className="main-wrapper flex flex-col sm:flex-row">
      <div className="w-full lg:w-3/4 p-2 ">
        <AddressSection />
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
