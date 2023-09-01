import { HeaderProfile, ProductCard, Tabs } from '@/components';
import { getProductByUser } from '@/helpers';
import { IProductPlain } from '@/interfaces';

export default async function ProfilePage(
  { params: { user } }: { params: { user: string } }
) {
  const products: IProductPlain[] = await getProductByUser(user);

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
