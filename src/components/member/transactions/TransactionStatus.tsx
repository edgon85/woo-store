import { OrderStatus } from '@/lib';

export default function TransactionStatus({ status }: { status: OrderStatus }) {
  const statusStyles = {
    Initiated: 'bg-blue-100 text-blue-500',
    Pending: 'bg-gray-100 text-gray-500',
    Confirmed: 'bg-yellow-100 text-yellow-500',
    Shipped: 'bg-purple-100 text-purple-500',
    OutForDelivery: 'bg-orange-100 text-orange-500',
    Delivered: 'bg-green-100 text-green-500',
    Completed: 'bg-green-500 text-white',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${statusStyles[status]}`}
    >
      {status}
      {/* {statusIcons[status]} */}
    </span>
  );
}
