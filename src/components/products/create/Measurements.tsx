import {
  sizeClothesMan,
  sizeShoes,
  sizeTrousers,
  sizesClothesWomen,
} from '@/assets/data';
import { useModal } from '@/hooks';
import { IClotesSize } from '@/interfaces';
import { measurementFormat } from '@/utils';

type Props = {
  gender: string;
  typeOfClothes: string;
  category?: string;
  setTalla: (talla: IClotesSize) => void;
};
export const Measurements = ({
  gender,
  typeOfClothes,
  category,
  setTalla,
}: Props) => {
  const { onCloseModal } = useModal();

  const handleClick = (size: IClotesSize) => {
    setTalla({ ...size });
    onCloseModal();
  };

  if (gender === 'mujer' && typeOfClothes === 'ropa') {
    return (
      <ul className="text-sm font-medium uppercase">
        {sizesClothesWomen.map((size) => (
          <li
            key={size.id}
            className="w-full px-4 py-2 border-b border-gray-200  cursor-pointer hover:bg-lightPrimary"
          >
            <p onClick={() => handleClick(size)}>
              {size.size}{' '}
              {size.id !== 'unica' ? (
                <>
                  / {size.us} <span className="text-gray-400">us</span> /{' '}
                  {size.eu} <span className="text-gray-400">eu</span>
                </>
              ) : (
                ''
              )}
            </p>
          </li>
        ))}
      </ul>
    );
  }

  if (gender === 'mujer' && typeOfClothes === 'zapatos') {
    return (
      <ul className="text-sm font-medium uppercase">
        {sizeShoes.map((size) => (
          <li
            key={size.id}
            className="w-full px-4 py-2 border-b border-gray-200  cursor-pointer hover:bg-lightPrimary"
          >
            <p onClick={() => handleClick(size)}>{size.size} </p>
          </li>
        ))}
      </ul>
    );
  }
  if (gender === 'hombre' && typeOfClothes === 'zapatos') {
    return (
      <ul className="text-sm font-medium uppercase">
        {sizeShoes.map((size) => (
          <li
            key={size.id}
            className="w-full px-4 py-2 border-b border-gray-200  cursor-pointer hover:bg-lightPrimary"
          >
            <p onClick={() => handleClick(size)}>{size.size} </p>
          </li>
        ))}
      </ul>
    );
  }
  if (
    gender === 'hombre' &&
    typeOfClothes === 'ropa' &&
    category === 'pantalones'
  ) {
    return (
      <ul className="text-sm font-medium uppercase">
        {sizeTrousers.map((size) => (
          <li
            key={size.id}
            className="w-full px-4 py-2 border-b border-gray-200  cursor-pointer hover:bg-lightPrimary"
          >
            <p onClick={() => handleClick(size)}>
              {measurementFormat('hombre', 'pantalones', size)}{' '}
            </p>
          </li>
        ))}
      </ul>
    );
  }
  if (gender === 'hombre' && typeOfClothes === 'ropa') {
    return (
      <ul className="text-sm font-medium uppercase">
        {sizeClothesMan.map((size) => (
          <li
            key={size.id}
            className="w-full px-4 py-2 border-b border-gray-200  cursor-pointer hover:bg-lightPrimary"
          >
            <p onClick={() => handleClick(size)}>{size.size} </p>
          </li>
        ))}
      </ul>
    );
  }
};
