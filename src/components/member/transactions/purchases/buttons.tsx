import { ArrowRightIcon } from '@/components/ui';
import Link from 'next/link';

export const OrderDetailBtn = ({ id }: { id: string }) => {
  return (
    <Link
      className="rounded-md border border-cerise-red-700 p-2 hover:bg-cerise-red-50"
      href={`/settings/transactions/purchases/${id}`}
    >
      <ArrowRightIcon className="text-cerise-red-700" />
    </Link>
  );
};
