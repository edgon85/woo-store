import { getOrderById } from '@/actions';
import { DownLoadGide, TransactionStatus } from '@/components';
import { IOrder } from '@/interfaces';
import { formatCurrency, formatDateToLocal } from '@/utils';
import Link from 'next/link';

type Props = {
  params: { id: string };
};

export default async function PageOrderDetail({ params }: Props) {
  const { data } = await getOrderById(params.id);

  const order = data as IOrder;

  const uuid = order.id;
  const partes = uuid.split('-');
  const ultimaParte = partes[partes.length - 1];
  return (
    <main>
      <p>Detalle de la orden</p>
      <br />
      <div className="border bg-white p-2">
        <div className="flex justify-between">
          <p>
            <span className="text-base">Orden id:</span>{' '}
            <span className="uppercase">{ultimaParte}</span>
          </p>
          <DownLoadGide
            prodSlug={order.product.slug!}
            urlGuidePdf={order.guideUrl}
          />
        </div>
        <div className="p-3 flex gap-4 md:flex-row md:gap-0 flex-col-reverse justify-between border mt-3">
          <div>
            <p className="text-base">Fecha de compra</p>
            <p>{formatDateToLocal(order.orderDate)}</p>
          </div>
          <div>
            <p className="text-base">Vendido por:</p>
            <p>{order.seller.fullName}</p>
          </div>
          <div>
            <p className="text-base">Estado:</p>
            <TransactionStatus status={order.orderStatus} />
          </div>
          <div className="text-base">
            <p>Guía #:</p>
            {
              <p>
                {order.guideNumber === null
                  ? 'Aun no disponible'
                  : order.guideNumber}
              </p>
            }
          </div>
          <div className="text-base">
            <p>Paquetería:</p>
            <span className="capitalice">{order.shippingService.name}</span>
          </div>
        </div>
        <div className="p-3 flex flex-col gap-4 md:flex-row md:gap-0 justify-between border mt-3">
          <div>
            <p className="text-base">Método de pago</p>
            <p>{order.paymentMethod.name}</p>
            <p>{order.paymentMethod.label}</p>
          </div>

          {/* TODO: Cambiar esto */}
          <div>
            <p className="text-base">Dirección de entrega:</p>
            <p>
              {order.shippingAddress},{' '}
              {/* {order.shippingAddress.municipality.name},
              {order.shippingAddress.department.name} */}
            </p>
          </div>
          <div>
            <p className="text-base">Teléfono:</p>
            <p>+502 {order.recipientPhone}</p>
          </div>
          <div className="text-base">
            <p>Compra:</p>
            <Link href={`/member/${order.buyer.username}`}>
              {order.buyer.fullName}
            </Link>
          </div>
          <div className="text-base">
            <p>Recibe:</p>
            {order.recipientName}
          </div>
        </div>
        <div className="p-3 flex  justify-between border mt-3">
          <div className="flex flex-col gap-4 md:flex-row md:gap-0 justify-between w-full">
            <div className="p-2 flex gap-2">
              <picture>
                <img
                  src={order.product.images[0]}
                  alt=""
                  width={100}
                  height={100}
                />
              </picture>
              <div className="">
                <p className="capitalize">{order.product.title}</p>
                <p>{formatCurrency(order.summary.productPrice * 100)}</p>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end">
              <p className="font-bold">
                <span className="text-base mr-4">Total:</span>
                {formatCurrency(order.summary.total * 100)}
              </p>
              <p>
                <span className="text-base mr-4">Cuota de servicio:</span>
                {formatCurrency(order.summary.serviceFee * 100)}
              </p>
              <p>
                <span className="text-base mr-4">Envió:</span>
                {formatCurrency(order.summary.deliveryTotal * 100)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
