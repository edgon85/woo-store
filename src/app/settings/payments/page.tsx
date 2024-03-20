import { redirect } from 'next/navigation';

export default function PaymentsMethodPage() {
  redirect('/settings/payments/payout-methods');

  /* return (
      <div>
        <h1>Payout page</h1>
      </div>
    ); */
}
