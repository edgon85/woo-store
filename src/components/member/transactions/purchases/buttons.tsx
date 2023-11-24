import Link from 'next/link';

import { FaArrowRight } from 'react-icons/fa';

export const OrderDetailBtn = ({ id }: { id: string }) => {
  return (
    <Link
      className="rounded-md border border-cerise-red-700 p-2 hover:bg-cerise-red-50"
      href={`/member/transactions/purchase/${id}`}
    >
      <FaArrowRight className="text-cerise-red-700" />
    </Link>
  );
};
