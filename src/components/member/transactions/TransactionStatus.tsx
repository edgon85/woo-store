import { OrderStatus } from '@/enums';
import { translateOrderStatus } from '@/utils';

export const TransactionStatus = ({ status }: { status: OrderStatus }) => {
  const statusStyles = {
    order_placed: 'bg-blue-100 text-blue-500',
    seller_notified: 'bg-gray-100 text-gray-500',
    preparing_order: 'bg-yellow-100 text-yellow-500',
    in_transit: 'bg-purple-100 text-purple-500',
    delivered_pending_payment: 'bg-orange-100 text-orange-500',
    completed: 'bg-green-500 text-white',
    cancelled: 'bg-green-100 text-green-500',
    failed: 'bg-green-100 text-green-500',
    refunded: 'bg-green-100 text-green-500',
    returned: 'bg-green-100 text-green-500',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${statusStyles[status]}`}
    >
      {translateOrderStatus(status)}
    </span>
  );
};
