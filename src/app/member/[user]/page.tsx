import { ProductCard } from '@/components';
import { getProductByUserIdOrUsername } from '@/helpers';
import { IProduct } from '@/interfaces';

export default async function UserMemberPage({
  params: { user },
}: {
  params: { user: string };
}) {
  const products: IProduct[] = await getProductByUserIdOrUsername(user);

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center mt-4">
        <p>aun no tiene productos</p>
      </div>
    );
  }

  return (
    <section className="mt-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
