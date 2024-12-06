import { IProduct } from '@/interfaces';
import { formatCurrency, formatMeasurementString } from '@/utils';

import { BtnActionsDetail } from './buttons/BtnActionsDetail';
import {
  CategoryIcon,
  CircleCheck,
  EyeDropIcon,
  RulerIcon,
  TagPriceIcon,
} from '@/components/ui';

type ListItemProps = {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
};

const ListItem: React.FC<ListItemProps> = ({ icon, title, content }) => (
  <li className="flex items-center">
    <h3 className="w-36 flex gap-1 items-center text-sm font-semibold py-1 text-gray-500">
      <span>{icon}</span> {title}
    </h3>
    <span className="flex-1">{content}</span>
  </li>
);

type Props = {
  product: IProduct;
  currentUserId: string;
};

export const ProductDetail = ({ product, currentUserId }: Props) => {
  const {
    title,
    price,
    description,
    measurement,
    category,
    clothesState,
    brand,
    colors,
    offer,
    fee,
    reservedFor,
  } = product;

  return (
    <div className="bg-white p-2 md:p-4 md:rounded md:shadow">
      <section>
        <h1 className="text-lg font-bold capitalize">{title}</h1>

        <div>
          {offer ? (
            <>
              {reservedFor?.userId === currentUserId ? (
                <>
                  <p className="line-through text-gray-500">
                    {formatCurrency(price * 100)}
                  </p>
                  <p className="font-semibold">
                    {formatCurrency((offer?.price! + fee!) * 100)}
                  </p>
                </>
              ) : (
                <p className="text-lg font-semibold text-cerise-red-700">
                  {formatCurrency(price * 100)}
                </p>
              )}
            </>
          ) : (
            <p className="text-lg font-semibold text-cerise-red-700">
              {formatCurrency(price * 100)}
            </p>
          )}
        </div>
      </section>
      <section className="prose prose-sm  mt-2 mb-4">
        <h2 className="text-lg font-bold text-gray-600">Descripción</h2>
        <p className="text-sm font-normal text-justify min-h-[50px] ">
          {description}
        </p>
      </section>
      <section className="divide-x-reverse divide-gray-300">
        <ul className="capitalize">
          <ListItem
            icon={<RulerIcon />}
            title="Talla"
            content={formatMeasurementString(measurement, category?.title!)}
          />
          <ListItem
            icon={<CircleCheck />}
            title="Estado"
            content={clothesState.title}
          />
          <ListItem
            icon={<CategoryIcon />}
            title="Categoría"
            content={category?.title}
          />
          <ListItem
            icon={<TagPriceIcon />}
            title="Marca"
            content={brand.title}
          />
          <ListItem
            icon={<EyeDropIcon />}
            title="Color"
            content={
              <p className="flex gap-1">
                {colors.map((color: any, index) => (
                  <span key={color.id}>
                    {color.name}
                    {index < colors.length - 1 ? ',' : ''}
                  </span>
                ))}
              </p>
            }
          />
        </ul>
      </section>
      {/* Resto del código ... */}
      <div className="un-divider border-t border-gray-300 my-4"></div>

      <BtnActionsDetail product={product} currentUserId={currentUserId} />
    </div>
  );
};
