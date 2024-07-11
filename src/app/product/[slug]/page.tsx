import {
  ProductDetail,
  BtnActions,
  UserInfo,
  RelatedProducts,
  ProductSlideshow,
  ProductMobileSlideshow,
  RejectedProduct,
} from '@/components';
import { getProductBySlug } from '@/actions';
import { IProduct } from '@/interfaces';

import { getAuthInfo } from '@/libs';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ProductDetailPage({
  params: { slug },
  searchParams: { offer_rejected },
}: Props) {
  const product = (await getProductBySlug(slug)) as IProduct;

  const userInfo = await getAuthInfo();
  const { id: currentUserId } = userInfo!;

  console.log({ offer_rejected });

  const { user } = product;

  return (
    <>
      <section className="main-wrapper mt-0 md:mt-4 grid grid-cols-1 md:grid-cols-3 gap-2">
        {/* Slideshow */}
        <div className="col-span-1 md:col-span-2 ">
          {/* Desktop */}
          <ProductSlideshow
            images={product.images}
            title={product.title}
            className="hidden md:block h-[85vh]"
          />
          {/* Mobile slideshow */}
          <ProductMobileSlideshow
            images={product.images}
            title={product.title}
            className="block md:hidden"
          />

          <div className="block md:hidden">
            <BtnActions
              productId={product.id!}
              productName={product.title}
              productPrice={product.price}
            />
          </div>
        </div>

        {/* Detalles */}
        <div className="col-span-1">
          <ProductDetail
            product={product}
            currentUserId={currentUserId || ''}
          />

          <div className="hidden md:block">
            <BtnActions
              productId={product.id!}
              productName={product.title}
              productPrice={product.price}
            />
          </div>

          <div className="mt-4">
            <UserInfo
              name={user?.fullName!}
              image={user?.profileImage!}
              location={user?.location!}
              username={user?.username!}
            />
          </div>
        </div>
      </section>
      <section className="main-wrapper">
        <RelatedProducts
          productSlug={product.slug!}
          currentUserId={currentUserId || ''}
        />
      </section>
      <RejectedProduct
        isRejected={offer_rejected === 'true'}
        product={product}
      />
    </>
  );
}

/* 
<>
      <section className="main-wrapper flex flex-col sm:flex-row">
        {/* <!-- Contenido (Lado izquierdo en pantallas grandes) --> * /}
        <div className="w-full lg:w-3/4 p-2 ">
          {/ * <LightBoxGallery images={prodImages} /> * /}
          <div className="container mx-auto ">
            {/* <ImageSlider images={product.images} /> * /}
            <ProductSlideshow images={product.images} title={product.title} />
            <BtnActions />
          </div>
        </div>

        {/* <!-- Aside (Lado derecho en pantallas grandes) --> * /}
        <aside className="w-full lg:w-2/5 p-2">
          <ProductDetail
            product={product}
            currentUserId={currentUserId || ''}
          />
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
*/
