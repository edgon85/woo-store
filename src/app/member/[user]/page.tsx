import { fetchPublicProfile } from '@/actions';
import { getProductByUserIdOrUsername } from '@/actions/products/get-products';
import { EmptyTransaction, ProductCard } from '@/components';

import { IProduct } from '@/interfaces';
import { getAuthInfo } from '@/libs';
import { Metadata, ResolvingMetadata } from 'next';
import NotFound from './not-found';

type Props = {
  params: { user: string };
};

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const {
    ok,
    message: messageData,
    data: userData,
  } = await fetchPublicProfile(props.params.user);

  if (!userData) {
    return {
      title: `Perfil de ${props.params.user} | Woo.online`,
    };
  }

  const username = userData.username;
  const title = `Explora las prendas de ${username} en Woo.online - Tu destino para renovar tu estilo`;
  const imageUrl = userData.profileImage || `${process.env.BASE_URL}/logo.svg`;
  let description = userData.biography;

  if (!description || description.trim() === '') {
    description = `Sumérgete en el mundo de ${username} en Woo.online. Descubre tesoros de moda, renueva tu armario y da una nueva vida a tus prendas favoritas. ¡Únete a nuestra comunidad de estilo consciente hoy!`;
  }
  return {
    title,
    description,
    openGraph: {
      title: title,
      description,
      images: [`${imageUrl}`],
      type: 'profile',
    },
  };
}

export default async function UserMemberPage({ params: { user } }: Props) {
  const products: IProduct[] = await getProductByUserIdOrUsername(user);

  const userInfo = await getAuthInfo();
  const { id: currentUserId } = userInfo!;

  if (!products) {
    NotFound();
  }

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
