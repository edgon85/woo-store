import { fetchOrderById } from '@/actions';
import { formatCurrency } from '@/utils';
import Link from 'next/link';

type Props = {
  params: { id: string };
};
export default async function ConfirmCheckoutPage({ params }: Props) {
  const uuid = params.id;
  const partes = uuid.split('-');
  const ultimaParte = partes[partes.length - 1];

  console.log(params.id);
  const order = await fetchOrderById(params.id);
  const { product, summary, packageDelivery, buyer } = order;

  return (
    <div className="w-full md:w-1/2 md:m-auto min-h-[70vh] flex flex-col items-center gap-8 mt-4 pt-4 pb-4 px-2 md:px-0">
      <picture>
        <img
          src="/successful_purchase.svg"
          alt="success purchase"
          width={200}
        />
      </picture>

      <h2 className="text-lg font-bold">Felicidades {buyer.fullName}</h2>
      <p>
        Tu vendedor ya fue notificado. Recuerda que tiene 7 días hábiles para
        enviar tu prenda por {packageDelivery.name}.
      </p>
      <p>¡Gracias por creer en la segunda mano!</p>

      <br />

      <div className="w-full">
        <h2 className="text-base font-bold">Resumen de compra</h2>
        <p className="pt-4 pb-4 uppercase">pedido id: {ultimaParte}</p>
        <div className="flex justify-between w-full">
          <div className="flex gap-4">
            <picture>
              <img src={product.images[0]} alt="" width={100} />
            </picture>
            <div>
              <h3 className="text-gray-500">{product.title}</h3>
              <p className="text-gray-500">
                Marca: <span className="capitalize">{product.brand.title}</span>{' '}
              </p>
              <p className="text-gray-500">
                Talla:{' '}
                <span className="uppercase">{product.measurement.size}</span>{' '}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="flex justify-between gap-2">
              <span className="font-bold">Envío: </span>
              <span> {formatCurrency(summary.delivery * 100)}</span>
            </p>
            <p className="flex justify-between gap-2">
              <span className="font-bold">Tarifa de servicio: </span>
              <span>{formatCurrency(summary.serviceFee * 100)}</span>
            </p>
            <p className="flex justify-between gap-2">
              <span className="font-bold">Precio del Producto: </span>
              <span>{formatCurrency(summary.productPrice * 100)}</span>
            </p>
            <p className="font-bold flex justify-between gap-2 text-cerise-red-600">
              <span>Total:</span>
              <span>{formatCurrency(summary.total * 100)}</span>
            </p>
          </div>
        </div>
      </div>

      <Link
        href="/"
        className="p-4 bg-cerise-red-600 text-white rounded font-semibold hover:bg-cerise-red-500"
      >
        ¡Quiero ver mas prendas!
      </Link>
    </div>
  );
}
