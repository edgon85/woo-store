import Link from 'next/link';

const ClothingOptions = [
  { id: 'ropa', slug: 'ropa', name: 'Ropa' },
  { id: 'zapatos', slug: 'zapatos', name: 'Zapatos' },
  { id: 'accesorios', slug: 'accesorios', name: 'Accesorios' },
];

type Props = {
  gender: string;
  isMobile?: boolean;
};

export const ClothingType = ({ gender, isMobile = false }: Props) => {
  return (
    <div className="divide-y divide-gray-300">
      {ClothingOptions.map((clothing) => (
        <li key={clothing.id} className="p-4">
          <Link href={`/catalog/${gender}/${clothing.slug}`}>
            {clothing.name}
          </Link>
        </li>
      ))}
    </div>
  );
};
