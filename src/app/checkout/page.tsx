'use client';

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
