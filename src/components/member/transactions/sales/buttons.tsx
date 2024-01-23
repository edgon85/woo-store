import { EditIcon } from '@/components/ui';
import { FaCloudUploadAlt, FaCloudDownloadAlt } from 'react-icons/fa';

import Link from 'next/link';

export const UpdateSale = ({ id }: { id: string }) => {
  return (
    <Link
      //   href={`/dashboard/invoices/${id}/edit`}
      href={`/settings/transactions/sales/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <FaCloudUploadAlt size={24} />
    </Link>
  );
};

export const DownLoadGide = ({ id }: { id: string }) => {
  return (
    <button className="rounded-md border p-2 hover:bg-gray-100">
      <FaCloudDownloadAlt size={24} />
    </button>
  );
};
