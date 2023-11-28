import { IProduct } from '@/interfaces';
import { measurementFormat } from '@/utils';
import { BsCheck2Circle, BsDropletHalf } from 'react-icons/bs';
import { IoMdPricetags } from 'react-icons/io';
import { TbCategory, TbRulerMeasure } from 'react-icons/tb';
import { BtnActionsDetail } from './sections/BtnActionsDetail';

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
  } = product;

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <section>
        <h1 className="text-lg font-bold capitalize">{title}</h1>
        <p className="text-lg font-semibold">Q{price}</p>
      </section>
      <section className="py-2">
        <h2 className="text-lg font-bold">Descripción</h2>
        <p className="text-sm font-normal text-justify min-h-[100px]">
          {description}
        </p>
      </section>
      <section className="divide-x-reverse divide-gray-300">
        <ul className="capitalize">
          <ListItem
            icon={<TbRulerMeasure />}
            title="Talla"
            content={measurementFormat(category?.title!, measurement)}
          />
          <ListItem
            icon={<BsCheck2Circle />}
            title="Estado"
            content={clothesState.title}
          />
          <ListItem
            icon={<TbCategory />}
            title="Categoría"
            content={category?.title}
          />
          <ListItem
            icon={<IoMdPricetags />}
            title="Marca"
            content={brand.title}
          />
          <ListItem
            icon={<BsDropletHalf />}
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
