import { getFavoritesByUser } from '@/actions';
import { EmptyTransaction, Pagination, ProductCard } from '@/components';
import { getAuthInfo } from '@/libs';
import { Metadata } from 'next';

type Props = {
  params: { user: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata: Metadata = {
  title: 'Favoritos',
};

export default async function UserRatingsPage({ params, searchParams }: Props) {
  const userInfo = await getAuthInfo();
  const { id: currentUserId } = userInfo!;

  const { page } = searchParams;

  const data = await getFavoritesByUser({
    username: params.user.trim(),
    take: 8,
    page: Number(page) || 1,
  });

  const { totalPage, favorites } = data;

  if (favorites.length === 0) {
    return (
      <EmptyTransaction
        label="¡Aun no tiene Favoritos!"
        subLabel="¡Tus productos favoritos se mostraran aquí."
        path="/products/create"
        btnText="Subir prenda"
        btnShow={false}
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[500] py-4">
        {favorites.map((favorite: any) => (
          <ProductCard
            key={favorite.id}
            product={favorite.product}
            currentUserId={currentUserId || ''}
          />
        ))}
      </div>
      {totalPage > 1 && <Pagination totalPages={totalPage} />}
    </>
  );
}
