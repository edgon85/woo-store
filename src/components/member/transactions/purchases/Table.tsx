'use client';
import { TransactionStatus } from '../TransactionStatus';
import { IOrder, formatCurrency, formatDateToLocal, uuIiMyFormat } from '@/lib';
import { SlLocationPin } from 'react-icons/sl';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';

type Props = {
  orders: IOrder[];
};

export const TablePurchases = ({ orders }: Props) => {
  const router = useRouter();

  const onClickHelp = (id: string) => {
    console.log(id);
    router.push(`/claim/open?reason=product_not_received&transaction=${id}`);
  };

  return (
    <>
      {orders?.map((order: IOrder) => {
        const images = order.product.images.map((image: any) => image.url);

        const { product, summary, seller, packageDelivery } = order;
        return (
          <div key={order.id}>
            {order.claim && (
              <div className="p-2 full bg-yellow-300">
                <p className="">Reclamo en revision</p>
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-1 md:gap-0 justify-between bg-white p-2 mb-1">
              <div className="flex gap-2">
                <picture>
                  <img src={images[0]} alt="" width={100} />
                </picture>
                <div>
                  <p className="text-lg capitalize">{product.title}</p>
                  <p>
                    <span className="text-gray-500 capitalize">Precio: </span>
                    {formatCurrency(summary.productPrice * 100)}
                  </p>
                  <p>
                    <span className="text-gray-500 capitalize">
                      Tarifa de servicio:{' '}
                    </span>
                    {formatCurrency(summary.serviceFee * 100)}
                  </p>
                  <p>
                    <span className="text-gray-500 capitalize">Envío: </span>
                    {formatCurrency(summary.delivery * 100)}
                  </p>

                  <br />

                  <p>
                    <span className="text-gray-500 capitalize">Total:</span>
                    {formatCurrency(summary.total * 100)}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p>
                  <span className="text-gray-500 capitalize mr-2">
                    pedido ID:
                  </span>{' '}
                  <span className="uppercase">{uuIiMyFormat(order.id)}</span>
                </p>
                <p>
                  <span className="text-gray-500 capitalize mr-2">Fecha:</span>{' '}
                  <span>{formatDateToLocal(order.orderDate)}</span>
                </p>
                <p>
                  <span className="text-gray-500 capitalize mr-2">
                    Vendedor:
                  </span>{' '}
                  <span>{seller.fullName}</span>
                </p>
                <p>
                  <span className="text-gray-500 capitalize mr-2">Estado:</span>{' '}
                  <TransactionStatus status={order.orderStatus!} />
                </p>
                <p>
                  <span className="text-gray-500 capitalize mr-2">Envío:</span>{' '}
                  <span>{packageDelivery.name}</span>
                </p>
                <p>
                  <span className="text-gray-500 capitalize mr-2">Guía:</span>{' '}
                  <span>{order.notes ? order.notes : '-'}</span>
                </p>
              </div>
              <div className="flex flex-col gap-4 items-center">
                <button className="w-full px-4 py-2 rounded bg-cerise-red-600 hover:bg-cerise-red-500 text-white">
                  Escribir al vendedor
                </button>
                <button
                  onClick={() => onClickHelp(order.id)}
                  className="w-full px-4 py-2 rounded bg-cerise-red-600 hover:bg-cerise-red-500 text-white"
                >
                  Necesito ayuda
                </button>
                <Link
                  href={''}
                  className="flex gap-1 justify-center items-center underline"
                >
                  <SlLocationPin size={18} />
                  Ver en Guatex
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
