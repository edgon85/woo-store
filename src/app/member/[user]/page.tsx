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
  const { data: userData } = await fetchPublicProfile(props.params.user);

  if (!userData) {
    return {
      title: `Perfil de ${props.params.user} | Woo store`,
    };
  }

  const username = userData.username;
  const title = `Explora las prendas de ${username} en Woo store - Tu destino para renovar tu estilo`;
  const imageUrl =
    userData.profileImage || `${process.env.BASE_URL}/opengraph-image.png`;
  let description = userData.biography;

  if (!description || description.trim() === '') {
    description = `Sumérgete en el mundo de ${username} en Woo store. Descubre tesoros de moda, renueva tu armario y da una nueva vida a tus prendas favoritas. ¡Únete a nuestra comunidad de estilo consciente hoy!`;
  }
  return {
    title,
    description,
    openGraph: {
      type: 'website',
      locale: 'es_ES',
      url: `${process.env.BASE_URL}/member/${username}`,
      title: title,
      description,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 400,
          alt: title,
        },
      ],
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
        path="/product/create"
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
