import { fetchOrderById } from '@/actions';
import { PageLoadingSkeleton, TransactionStatus } from '@/components';
import { formatCurrency } from '@/utils';
import { translateOrderStatus } from '@/utils';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Detalle de orden',
};

export default async function Page({ params }: { params: { id: string } }) {
  const { data: order } = await fetchOrderById(params.id);

  const uuid = order.id;
  const partes = uuid.split('-');
  const ultimaParte = partes[partes.length - 1];

  // TODO: Colocar numero de rastreo

  // console.log(order);
  return (
    <>
      <Suspense fallback={<PageLoadingSkeleton />}>
        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto mt-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-700">
                Detalle de la orden
              </h1>
              <p className="text-gray-500">Order ID: {ultimaParte}</p>
              <p className="text-gray-500">
                {new Date(order.orderDate).toLocaleDateString()}
              </p>

              <TransactionStatus status={order.orderStatus!} />
            </div>
          </div>

          <div className="flex mt-8 space-x-4">
            <div className="flex-1">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700">
                  Comprador
                </h3>
                <p>
                  <span className="font-bold">Nombre:</span>{' '}
                  {order.buyer.fullName}
                </p>
                <p>
                  <span className="font-bold">Usuario:</span>{' '}
                  {order.buyer.username}
                </p>
                <p>
                  <span className="font-bold">Teléfono:</span>{' '}
                  {order.shippingAddress.phone}
                </p>
                <p>
                  <span className="font-bold">Dirección:</span>{' '}
                  {order.shippingAddress.fullAddress},{' '}
                  {order.shippingAddress.city}, {order.shippingAddress.country}
                </p>
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700">
                  Info de la orden
                </h3>
                <p>
                  <span className="font-bold">Envío por: </span>{' '}
                  {order.shippingService.name}
                </p>
                <p>
                  <span className="font-bold">Método de pago: </span>{' '}
                  {order.paymentMethod.name}
                </p>
                <p>
                  <span className="font-bold">Estado de la orden: </span>{' '}
                  {translateOrderStatus(order.orderStatus)}
                </p>
                <p>
                  <span className="font-bold">No. de rastreo: </span>{' '}
                  {order.notes ? order.notes : '-'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700">Producto</h3>
              <p>
                <span className="font-bold">Titulo: </span>{' '}
                {order.product.title}
              </p>
              <p>
                <span className="font-bold">Descripción: </span>{' '}
                {order.product.description}
              </p>
              <p>
                <span className="font-bold">Precio: </span>{' '}
                {formatCurrency(order.product.price * 100)}
              </p>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700">Resumen</h3>
              <p>
                <span className="font-bold">Envío: </span>{' '}
                {formatCurrency(order.summary.delivery * 100)}
              </p>
              <p>
                <span className="font-bold">Tarifa de servicio: </span>{' '}
                {formatCurrency(order.summary.serviceFee * 100)}
              </p>
              <p>
                <span className="font-bold">Precio del Producto: </span>
                {formatCurrency(order.summary.productPrice * 100)}
              </p>
              <p className="font-bold">
                Total: {formatCurrency(order.summary.total * 100)}
              </p>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}
