import {
  ProductDetail,
  BtnActions,
  UserInfo,
  ProductSlideshow,
  RejectedProduct,
} from '@/components';
import { getComments, getProductBySlug } from '@/actions';

import { getAuthInfo } from '@/libs';
import { Metadata, ResolvingMetadata } from 'next';
import { formatTitle } from '@/utils';
import { ProductComments } from '@/components/products/product-detail/comments/ProductComments';
import NotFound from './not-found';
import { IProduct } from '@/interfaces';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { ok, data: product } = await getProductBySlug(props.params.slug);

  if (!ok) {
    return {
      title: formatTitle(props.params.slug),
    };
  }

  const title = product?.title || 'Woo Store';
  const imageUrl =
    product?.coverImage?.replace('.webp', '.jpg') ||
    `${process.env.BASE_URL}/opengraph-image.png`;
  const description =
    product?.description ||
    'Descubre miles de artículos de moda a precios increíbles en Woo Store. Renueva tu closet y vende lo que ya no usas.';

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      locale: 'es_ES',
      url: `${process.env.BASE_URL}/product/${props.params.slug}`, // URL del producto
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

export default async function ProductDetailPage({
  params: { slug },
  searchParams: { offer_rejected, focus },
}: Props) {
  const focusMessage = focus === 'message';

  const { ok, data } = await getProductBySlug(slug);

  const product = data as IProduct;

  if (!ok) {
    NotFound();
  }

  const { data: comments } = await getComments(product.id!);

  const userInfo = await getAuthInfo();
  const { id: currentUserId } = userInfo!;

  const { user } = product;

  return (
    <>
      <section className="main-wrapper mt-0 md:mt-4 grid grid-cols-1 md:grid-cols-3 gap-2">
        {/* Image Slideshow */}
        <div className="col-span-1 md:col-span-2">
          <ProductSlideshow
            images={product.images}
            title={product.title}
            className="w-full bg-white"
          />
        </div>

        {/* Detalles */}
        <div className="col-span-1 md:row-span-2">
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="order-2 md:order-1">
              <ProductDetail
                product={product}
                currentUserId={currentUserId || ''}
              />
            </div>
            <div className="order-1 md:order-2">
              <BtnActions
                productId={product.id!}
                productName={product.title}
                productPrice={product.price}
              />
            </div>
            <div className="order-3">
              <UserInfo
                name={user?.fullName!}
                image={user?.profileImage!}
                location={user?.location!}
                username={user?.username!}
              />
            </div>
          </div>
        </div>

        {/* Comentarios */}
        <div className="col-span-1 md:col-span-2">
          <ProductComments
            productId={product.id!}
            comments={comments === null ? [] : comments}
            focusMessage={focusMessage}
            productTitle={product.title}
          />
        </div>
      </section>
      <RejectedProduct
        isRejected={offer_rejected === 'true'}
        product={product}
      />
    </>
  );
}
