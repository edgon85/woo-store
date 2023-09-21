import { IProduct } from '@/interfaces';
import Link from 'next/link';

export const ProductInfo = ({
  title,
  price,
  measurement,
  clothesState,
  brand,
  slug,
}: IProduct) => (
  <Link href={`/product/${slug}`}>
    <h3 className="text-lg font-semibold capitalize">{title}</h3>
    <p className="text-gray-600">Q{price}</p>
    <p className="text-gray-500 capitalize">
      <span>Talla: {measurement.size}</span> | <span>{clothesState.title}</span>
    </p>
    <p className="text-gray-500 capitalize">{brand.title}</p>
  </Link>
);