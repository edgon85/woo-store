'use client';
import Link from 'next/link';

import { BtnConfirmReceipt } from './BtnConfirmReceipt';
import { formatCurrency, formatDateToLocal, uuIiMyFormat } from '@/utils';
import { IOrder } from '@/interfaces';
import { OrderStatus } from '@/enums';
import { TransactionStatus } from '../TransactionStatus';
import { MapMarker } from '@/components/ui';

type Props = {
  orders: IOrder[];
};
export const TablePurchases = ({ orders }: Props) => {
  return (
    <div className="space-y-4">
      {orders?.map((order: IOrder) => {
        const images = order.product.images.map((image: any) => image.url);
        const { product, summary, seller, shippingService } = order;

        const productPrice = summary.productPrice + summary.serviceFee;
        return (
          <div
            key={order.id}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            {order.claim && (
              <div className="bg-yellow-300 p-2">
                <p className="text-center font-semibold">Reclamo en revisión</p>
              </div>
            )}
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Product Information */}
              <div className="flex gap-4">
                <picture>
                  <img
                    src={images[0]}
                    alt={product.title}
                    className="w-24 h-24 object-cover"
                  />
                </picture>
                <div>
                  <h3 className="text-lg font-semibold capitalize">
                    {product.title}
                  </h3>
                  <p>
                    <span className="text-gray-500">Precio:</span>{' '}
                    {formatCurrency(productPrice * 100)}
                  </p>
                  {/* <p>
                    <span className="text-gray-500">Tarifa de servicio:</span>{' '}
                    {formatCurrency(summary.serviceFee * 100)}
                  </p> */}
                  <p>
                    <span className="text-gray-500">Envío:</span>{' '}
                    {formatCurrency(order.summary.deliveryTotal * 100)}
                  </p>
                  <p className="font-semibold mt-2">
                    <span className="text-gray-500">Total:</span>{' '}
                    {formatCurrency(summary.total * 100)}
                  </p>
                </div>
              </div>

              {/* Order Details */}
              <div className="space-y-1">
                <p>
                  <span className="text-gray-500">Pedido ID:</span>{' '}
                  <span className="uppercase">{uuIiMyFormat(order.id)}</span>
                </p>
                <p>
                  <span className="text-gray-500">Fecha:</span>{' '}
                  {formatDateToLocal(order.orderDate)}
                </p>
                <p>
                  <span className="text-gray-500">Vendedor:</span>{' '}
                  {seller.fullName}
                </p>
                <p>
                  <span className="text-gray-500">Estado:</span>{' '}
                  <TransactionStatus status={order.orderStatus!} />
                </p>
                <p>
                  <span className="text-gray-500">Envío:</span>{' '}
                  {shippingService.name}
                </p>
                <p>
                  <span className="text-gray-500">Guía:</span>{' '}
                  {order.guideNumber || '-'}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                {/* <BtnSendMessage
                  productId={order.product.id!}
                  recipientId={order.seller.id!}
                  title={order.product.title!}
                  recipientUsername={order.seller.username!}
                /> */}
                <Link
                  href={`/product/${order.product.slug}?focus=message`}
                  className="w-full border border-cerise-red-700 text-cerise-red-700 text-sm hover:bg-cerise-red-500 hover:text-white rounded flex justify-center items-center py-2"
                >
                  Enviar mensaje
                </Link>

                {order.orderStatus === OrderStatus.Completed &&
                  !order.received &&
                  !order.claim && <BtnConfirmReceipt orderId={order.id} />}

                {!order.received && (
                  <Link
                    href={`/claim/open?reason=product_not_received&transaction=${order.id}`}
                    className="w-full px-4 py-2 text-center rounded bg-cerise-red-600 hover:bg-cerise-red-500 text-white"
                  >
                    Necesito ayuda
                  </Link>
                )}

                {order.orderStatus !== OrderStatus.Completed && (
                  <Link
                    href=""
                    className="flex gap-1 justify-center items-center underline"
                  >
                    <MapMarker />
                    Ver en {order.shippingService.name}
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
