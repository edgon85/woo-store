import { getProductByUserIdOrUsername } from '@/actions/products/get-products';
import { EmptyTransaction, ProductCard } from '@/components';

import { IProduct } from '@/interfaces';
import { cookies } from 'next/headers';

export default async function UserMemberPage({
  params: { user },
}: {
  params: { user: string };
}) {
  const products: IProduct[] = await getProductByUserIdOrUsername(user);
  const currentUserId = cookies().get('userId')?.value;

  if (products.length === 0) {
    return (
      <EmptyTransaction
        label="¡Aun no tienes Productos!"
        subLabel="¡Consigue tu primera venta! Cuantas más prendas publiques, más oportunidades de vender."
        path="/products/create"
        btnText="Subir prenda"
      />
    );
  }

  return (
    <section className="mt-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            currentUserId={currentUserId || ''}
          />
        ))}
      </div>
    </section>
  );
}
