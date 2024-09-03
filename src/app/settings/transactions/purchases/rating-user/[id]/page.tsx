import { checkImageAvailable, getOrderBuyer } from '@/actions';
import { PageLoadingSkeleton, RatingItem } from '@/components';
import { formatCurrency } from '@/utils';
import { FormRating } from '@/components/settings/ratings/FormRating';
import { BtnActionsRating } from '@/components/settings/ratings/BtnActionsRating';
import { Metadata } from 'next';
import { Suspense } from 'react';

type RatingUserPageProps = {
  params: { id: string };
};

export const metadata: Metadata = {
  title: 'Valoraciones',
};

export default async function RatingUserPage({ params }: RatingUserPageProps) {
  // console.log(params.id);

  const order = await getOrderBuyer(params.id);

  const { data } = order;

  const imageUrl = await checkImageAvailable(data.product.images[0] || '');

  return (
    <>
      <Suspense fallback={<PageLoadingSkeleton />}>
        <div className="w-full md:w-1/2 md:m-auto min-h-[70vh] py-4">
          <div className="flex flex-col items-center">
            <h2 className="mb-4 text-base font-semibold">
              Califica a tu vendedor
            </h2>
            <div className="flex gap-2">
              <picture>
                <img
                  src={imageUrl ?? '/empty-image.svg'}
                  alt={data.product.title}
                  width={200}
                />
              </picture>
              <div>
                <p className="text-lg font-semibold">{data.product.title}</p>
                <p className="text-base">
                  {formatCurrency(data.summary.total * 100)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <p className="mb-4 text-lg font-bold capitalize">
              Califica a {data.seller.username}:{' '}
            </p>
            <div className="flex flex-col gap-3">
              <RatingItem title="Rapidez de envío" aspect="shippingSpeed" />
              <RatingItem
                title="Descripción de prenda"
                aspect="accurateDescription"
              />
              <RatingItem
                title={`Comunicación con ${data.seller.username}`}
                aspect="sellerCommunication"
              />
              <RatingItem
                title="Limpieza del producto"
                aspect="productCleanliness"
              />
              <RatingItem
                title="Presentación del paquete"
                aspect="packagePresentation"
              />
              <FormRating />

              <div className="">
                <BtnActionsRating orderId={params.id} />
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}
