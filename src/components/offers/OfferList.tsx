import Link from 'next/link';

import { IOffer } from '@/interfaces';
import { formatCurrency, formatDateToLocal, offerStatus } from '@/utils';
import { BtnAcceptOffer } from './';
import { BtnRejectOffer } from './BtnRejectOffer';

type Props = {
  offers: IOffer[];
};

export const OfferList = ({ offers }: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left">Producto</th>
            <th className="py-3 px-4 text-left">Precio</th>
            <th className="py-3 px-4 text-left">Precio Ofertado</th>
            <th className="py-3 px-4 text-left">Comprador</th>
            <th className="py-3 px-4 text-left">Fecha</th>
            <th className="py-3 px-4 text-left">Estado</th>
            <th className="py-3 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {offers.map((offer: IOffer) => (
            <tr key={offer.id} className="hover:bg-gray-50">
              <td className="py-4 px-4">
                <Link
                  href={`/product/${offer.product.slug}`}
                  className="hover:underline"
                >
                  {offer.product.title}
                </Link>
              </td>
              <td className="py-4 px-4 font-medium">
                {formatCurrency(offer.product.price * 100)}
              </td>
              <td className="py-4 px-4 text-green-600 font-bold">
                {formatCurrency(offer.price * 100)}
              </td>
              <td className="py-4 px-4">{offer.buyer.username}</td>
              <td className="py-4 px-4">
                {formatDateToLocal(offer.createdAt.toString())}
              </td>
              <td className="py-4 px-4">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
              ${
                offer.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : offer.status === 'accepted'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
                >
                  {offerStatus(offer.status)}
                </span>
              </td>
              <td className="py-4 px-4">
                {offer.status === 'pending' && (
                  <div className="flex space-x-2">
                    <BtnAcceptOffer offer={offer} />
                    <BtnRejectOffer offer={offer} />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
