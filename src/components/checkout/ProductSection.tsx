import { IProduct, ISubcategoryWithCategory } from '@/interfaces';
import { measurementFormat } from '@/utils';
import Image from 'next/image';

type Props = {
  product: IProduct;
};

export const ProductSection = ({ product: productCheckout }: Props) => {
  const category = (productCheckout?.subcategory as ISubcategoryWithCategory)
    .category?.title!;
  return (
    <section className="bg-white border p-6 rounded shadow-sm">
      <h2 className="text-xl text-gray-400 mb-4">Pedido</h2>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <picture>
            <img
              src={productCheckout?.images[0]!}
              alt={productCheckout?.title!}
              className="w-14 h-auto"
            />
          </picture>
          {/*  <Image
            src={productCheckout?.images[0]!}
            width="50"
            height="50"
            alt={productCheckout?.title!}
          /> */}
          <div className="flex flex-col">
            <h2 className="text-lg">{productCheckout?.title}</h2>
            <p className="flex gap-2">
              <span>
                {measurementFormat(
                  `${category}`,
                  productCheckout?.measurement!
                )}
              </span>
              ·
              <span className="capitalize">
                {productCheckout?.clothesState.title}
              </span>
            </p>
          </div>
        </div>
        <p className="text-base font-bold">Q{productCheckout?.price}</p>
      </div>
    </section>
  );
};
