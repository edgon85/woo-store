import Link from 'next/link';

import { FaArrowRight } from 'react-icons/fa';

export const OrderDetailBtn = ({ id }: { id: string }) => {
  return (
    <Link
      className="rounded-md border p-2 hover:bg-gray-100"
      href={`/member/transactions/purchase/${id}`}
    >
      <FaArrowRight />
    </Link>
  );
};
