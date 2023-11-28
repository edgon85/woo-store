import {
  ProductDetail,
  ImageSlider,
  BtnActions,
  UserInfo,
  RelatedProducts,
} from '@/components';
import { getProductBySlug } from '@/lib';
import { IProduct } from '@/interfaces';
import { cookies } from 'next/headers';

type Props = {
  params: { slug: string };
};

export default async function ProductDetailPage({ params: { slug } }: Props) {
  const product: IProduct = await getProductBySlug(slug);
  const currentUserId = cookies().get('userId')?.value;

  const { user } = product;
  return (
    <>
      <section className="main-wrapper flex flex-col sm:flex-row">
        {/* <!-- Contenido (Lado izquierdo en pantallas grandes) --> */}
        <div className="w-full lg:w-3/4 p-2 ">
          {/* <LightBoxGallery images={prodImages} /> */}
          <div className="container mx-auto ">
            <ImageSlider images={product.images} />
            <BtnActions />
          </div>
        </div>

        {/* <!-- Aside (Lado derecho en pantallas grandes) --> */}
        <aside className="w-full lg:w-2/5 p-2">
          <ProductDetail product={product} currentUserId={ currentUserId || ''} />
          <div className="mt-4">
            <UserInfo
              name={user?.fullName!}
              image={user?.profileImage!}
              location={user?.location!}
              username={user?.username!}
            />
          </div>
        </aside>
      </section>
      <section className="main-wrapper">
        <RelatedProducts />
      </section>
    </>
  );
}
