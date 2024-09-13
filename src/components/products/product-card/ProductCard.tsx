import Image from 'next/image';

import { IProduct } from '@/interfaces';
import { UserProfile } from './UserProfile';
import { checkImageAvailable } from '@/actions';

import Link from 'next/link';
import { formatCurrency } from '@/utils';
import { TagPriceIcon } from '@/components/ui';

type Props = {
  product: IProduct;
  currentUserId: string;
};

export const ProductCard = async ({ product, currentUserId }: Props) => {
  const imageUrl = await checkImageAvailable(product.coverImage);

  const statusInfo = getStatusMessage(product.status);

  return (
    <div className="relative w-full bg-white max-w-md mx-auto border border-gray-200 rounded-lg">
      <div className="relative group">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={imageUrl ?? '/empty-image.svg'}
            width={800}
            height={800}
            alt={product.title}
            className="aspect-square object-cover w-full rounded-t-lg"
          />
        </Link>
        <div className="absolute top-2 right-2">
          <UserProfile user={product.user!} />
        </div>
        {statusInfo && (
          <div
            className={`absolute bottom-0 left-0 right-0 ${statusInfo.bgColor} px-2 py-2`}
          >
            <p className="text-white font-bold">{statusInfo.text}</p>
          </div>
        )}
      </div>
      <div className="space-y-2 bg-white rounded-b-lg p-2">
        <Link
          href={`/product/${product.slug}`}
          className="hover:text-cerise-red-600"
        >
          <h3 className="text-sm md:text-lg font-semibold capitalize">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm font-bold text-cerise-red-500">
              {formatCurrency(product.price * 100)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm text-gray-500">
              Talla:
            </span>
            <span className="font-medium uppercase text-gray-500">
              {product.measurement.size}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <TagPriceIcon className="h-4 w-4 text-gray-500" />
          <span className="text-gray-500">{product.brand.title}</span>
        </div>
      </div>
      {currentUserId === product.user?.id && (
        <Link
          href={`/product/edit/${product.id}`}
          className="w-full inline-block bg-gradient-to-r from-cerise-red-500 to-cerise-red-600 hover:bg-gradient-to-br hover:from-cerise-red-600 hover:to-cerise-red-700 text-white text-center py-2"
        >
          Editar
        </Link>
      )}
    </div>
  );
};

const getStatusMessage = (status: string) => {
  switch (status) {
    case 'pending':
      return { text: 'Pendiente', bgColor: 'bg-yellow-400' };
    case 'sold':
      return { text: 'Vendido', bgColor: 'bg-green-400' };
    case 'archived':
      return { text: 'Archivado', bgColor: 'bg-gray-400' };
    case 'hidden':
      return { text: 'Oculto', bgColor: 'bg-blue-600' };
    case 'reserved':
      return { text: 'Reservado', bgColor: 'bg-blue-400' };
    case 'under_review':
      return { text: 'En revisión', bgColor: 'bg-red-800' };
    case 'pending_payment':
      return { text: 'Pendiente de pago', bgColor: 'bg-red-400' };
    case 'available':
    default:
      return null;
  }
};
