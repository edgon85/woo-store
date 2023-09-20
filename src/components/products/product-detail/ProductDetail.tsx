import { Button, HeartIcon, TooltipIcon } from '@/components/ui';
import { BsCheck2Circle, BsDropletHalf } from 'react-icons/bs';
import { IoMdPricetags } from 'react-icons/io';
import { TbCategory, TbRulerMeasure } from 'react-icons/tb';

export const ProductDetail = () => {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <section className="">
        <h1 className="text-lg font-bold capitalize">blazer verde</h1>
        <p className="py-1 text-gray-500">
          <span>M</span> | <span>En perfecto estado</span>
        </p>
        <p className="font-semibold text-darkPrimary">Aeropostal</p>
        <p className="text-lg font-semibold">Q250.00</p>
      </section>
      <section className="py-2">
        <h2 className="text-lg font-bold">Descripción</h2>
        <p className="text-sm font-normal text-justify min-h-[100px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam,
          officia. Doloribus laudantium sunt repellat harum aut exercitationem.
          Nobis, illo? Nulla amet suscipit, minima recusandae harum alias?
          Molestias placeat dolore cumque!
        </p>
      </section>
      {/* <section className='divide-y divide-gray-300'> */}
      <section className="divide-x-reverse divide-gray-300">
        <ul>
          <li className="flex items-center">
            <h3 className="w-36 flex gap-1 items-center text-sm font-semibold py-1 text-gray-500">
              <span>
                <TbRulerMeasure />
              </span>{' '}
              Talla
            </h3>
            <span className="flex-1">M / 8-10 US / 38 EU</span>
          </li>
          <li className="flex items-center">
            <h3 className="w-36 flex gap-1 items-center text-sm font-semibold py-1 text-gray-500">
              <span>
                <BsCheck2Circle />
              </span>{' '}
              Estado
            </h3>
            <span className="flex-1">En perfecto estado</span>
          </li>
          <li className="flex items-center">
            <h3 className="w-36 flex gap-1 items-center text-sm font-semibold py-1 text-gray-500">
              <span>
                <TbCategory />
              </span>{' '}
              Categoría
            </h3>
            <span className="flex-1">Blazers</span>
          </li>

          <li className="flex items-center">
            <h3 className="w-36 flex gap-1 items-center text-sm font-semibold py-1 text-gray-500">
              <span>
                <IoMdPricetags />
              </span>{' '}
              Marca
            </h3>
            <span className="flex-1">Aeropostal</span>
          </li>
          <li className="flex items-center">
            <h3 className="w-36 flex gap-1 items-center text-sm font-semibold py-1 text-gray-500">
              <span>
                <BsDropletHalf />
              </span>{' '}
              Color
            </h3>
            <span className="flex-1">Rojo, Verde</span>
          </li>
        </ul>
      </section>
      <div className="un-divider border-t border-gray-300 my-4"></div>
      <section className=" flex flex-col gap-4">
        <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
          <span>Envíos a todo el país</span>
          <span>|</span>
          <span>Protección al comprador</span>
          <TooltipIcon />
        </div>
        <Button label="Comprar" type="button" />
        <Button label="Hacer oferta" type="button" outlined />
        <Button label="Enviar mensaje" type="button" outlined />
        {/* <Button label="Añadir a favoritos" type="button" outlined icon={HeartIcon}/> */}
      </section>
    </div>
  );
};
