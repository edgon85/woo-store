import { getOrderById } from '@/actions';
import { DownLoadGide, TransactionStatus } from '@/components';
import { formatCurrency, formatDateToLocal } from '@/utils';
import Link from 'next/link';

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const { data } = await getOrderById(params.id);

  const uuid = data.id;
  const partes = uuid.split('-');
  const ultimaParte = partes[partes.length - 1];
  return (
    <main>
      <p>Detalle de la orden</p>
      <br />
      <div className="border bg-white p-2">
        <div className="flex justify-between">
          <p>
            <span className="text-base">Orden id:</span> {ultimaParte}
          </p>
          <DownLoadGide
            prodSlug={data.product.slug}
            urlGuidePdf={data.guideUrl}
          />
        </div>
        <div className="p-3 flex gap-4 md:flex-row md:gap-0 flex-col-reverse justify-between border mt-3">
          <div>
            <p className="text-base">Fecha de compra</p>
            <p>{formatDateToLocal(data.orderDate)}</p>
          </div>
          <div>
            <p className="text-base">Vendido por:</p>
            <p>{data.seller.fullName}</p>
          </div>
          <div>
            <p className="text-base">Estado:</p>
            <TransactionStatus status={data.orderStatus} />
          </div>
          <div className="text-base">
            <p>Guía #:</p>
            {<p>{data.notes === null ? 'Aun no disponible' : data.notes}</p>}
          </div>
          <div className="text-base">
            <p>Paquetería:</p>
            <span className="capitalice">{data.packageDelivery.name}</span>
          </div>
        </div>
        <div className="p-3 flex flex-col gap-4 md:flex-row md:gap-0 justify-between border mt-3">
          <div>
            <p className="text-base">Método de pago</p>
            <p>{data.paymentMethod.name}</p>
            <p>{data.paymentMethod.label}</p>
          </div>
          <div>
            <p className="text-base">Dirección de entrega:</p>
            <p>
              {data.shippingAddress.fullAddress}, {data.shippingAddress.city},
              {data.shippingAddress.country}
            </p>
          </div>
          <div>
            <p className="text-base">Teléfono:</p>
            <p>+502 {data.shippingAddress.phone}</p>
          </div>
          <div className="text-base">
            <p>Compra:</p>
            <Link href={`/member/${data.buyer.username}`}>
              {data.buyer.fullName}
            </Link>
          </div>
          <div className="text-base">
            <p>Recibe:</p>
            {data.shippingAddress.fullName}
          </div>
        </div>
        <div className="p-3 flex  justify-between border mt-3">
          <div className="flex flex-col gap-4 md:flex-row md:gap-0 justify-between w-full">
            <div className="p-2 flex gap-2">
              <picture>
                <img
                  src={data.product.images[0]}
                  alt=""
                  width={100}
                  height={100}
                />
              </picture>
              <div className="">
                <p className="capitalize">{data.product.title}</p>
                <p>{formatCurrency(data.product.price * 100)}</p>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end">
              <p className="font-bold">
                <span className="text-base mr-4">Total:</span>
                {formatCurrency(data.summary.total * 100)}
              </p>
              <p>
                <span className="text-base mr-4">Cuota de servicio:</span>
                {formatCurrency(data.summary.serviceFee * 100)}
              </p>
              <p>
                <span className="text-base mr-4">Envió:</span>
                {formatCurrency(data.summary.deliveryTotal * 100)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* 
<div className="p-2 flex ">
          <picture>
            <img src={data.product.images[0]} alt="" width={100} height={100} />
          </picture>
          <div>
            <p>{data.product.title}</p>
            <p>{formatCurrency(data.product.price * 100)}</p>
          </div>
        </div>
*/
