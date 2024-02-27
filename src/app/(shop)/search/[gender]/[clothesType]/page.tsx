import { searchProduct } from '@/actions';
import { Pagination, ProductCard } from '@/components';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type Props = {
  params: { gender: string; clothesType: string };
  searchParams: { query: string };
};

export default async function SearchPage({ params, searchParams }: Props) {
  const { gender, clothesType } = params;
  const { query } = searchParams;
  if (query === '' || query === undefined) {
    redirect('/');
  }
  const currentUserId = cookies().get('userId')?.value;
  const { products, totalPage } = await searchProduct({
    query: query.trim(),
    gender,
    clothesType,
  });

  if (products.length === 0) {
    return (
      <div className="w-full mt-10 md:mt-10 flex flex-col justify-center items-center">
        <picture>
          <img
            src="/blank_canvas.svg"
            alt="Imagen de no hay productos disponibles"
            className="max-w-80"
          />
        </picture>
        <p className="text-lg">No se encontraron coincidencias para {query}</p>
      </div>
    );
  }
  return (
    <div className="min-h-[700px] main-wrapper">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[500]">
        {products.map((product: any) => (
          <ProductCard
            key={product.id}
            product={product}
            currentUserId={currentUserId || ''}
          />
        ))}
      </div>
      <Pagination totalPages={totalPage} />
    </div>
  );
}
