import { getMeasurementFilter } from '@/helpers/httpHelper';
import { useModal } from '@/hooks';
import { IClotesSize } from '@/interfaces';
import { useEffect, useState } from 'react';

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
  const [measurements, setMeasurements] = useState<IClotesSize[]>([]);

  const handleClick = (size: IClotesSize) => {
    setTalla({ ...size });
    onCloseModal();
  };

  useEffect(() => {
    if (category === 'pantalones' && gender === 'hombre') {
      getData('hombre', 'pantalon');
    } else {
      getData(gender, typeOfClothes);
    }
  }, [gender, typeOfClothes, category]);

  const getData = async (gender: string, type: string) => {
    const data = await getMeasurementFilter(gender, type);
    setMeasurements(data);
  };

  return (
    <>
      <ul className="text-sm font-medium uppercase">
        {measurements
          .sort((a, b) => a.id - b.id)
          .map((measurement) => {
            const { slug } = measurement;
            return (
              <li
                key={slug}
                className="w-full px-4 py-2 border-b border-gray-200  cursor-pointer hover:bg-lightPrimary"
              >
                <Items
                  measurement={measurement}
                  onHandleClick={handleClick}
                  category={category ?? ''}
                />
              </li>
            );
          })}
      </ul>
    </>
  );
};

type ItemsProps = {
  measurement: IClotesSize;
  onHandleClick: (measurement: IClotesSize) => void;
  category: string;
};
export const Items = ({ measurement, onHandleClick, category }: ItemsProps) => {
  const { eu, gender, long, size, slug, type, uk, us, waist } = measurement;

  if (gender === 'mujer' && type === 'ropa') {
    return (
      <p onClick={() => onHandleClick(measurement)}>
        <span className="bg-indigo-100 text-indigo-800 font-medium  px-2.5 py-0.5 rounded">
          {size}
        </span>{' '}
        {size !== 'unica' ? (
          <>
            |{' '}
            <span className="bg-indigo-100 text-indigo-800 font-medium  px-2.5 py-0.5 rounded">
              {' '}
              {us} us
            </span>{' '}
            |{' '}
            <span className="bg-indigo-100 text-indigo-800 font-medium  px-2.5 py-0.5 rounded">
              {' '}
              {eu} eu
            </span>
          </>
        ) : (
          ''
        )}
      </p>
    );
  }

  if (gender === 'mujer' && type === 'zapatos') {
    return (
      <p onClick={() => onHandleClick(measurement)}>
        <span className="bg-indigo-100 text-indigo-800 font-medium  px-2.5 py-0.5 rounded">
          {size} cm
        </span>{' '}
        |{' '}
        <span className="bg-indigo-100 text-indigo-800 font-medium  px-2.5 py-0.5 rounded">
          {us} us
        </span>{' '}
        |{' '}
        <span className="bg-indigo-100 text-indigo-800 font-medium  px-2.5 py-0.5 rounded">
          {uk} uk
        </span>{' '}
        |{' '}
        <span className="bg-indigo-100 text-indigo-800 font-medium  px-2.5 py-0.5 rounded">
          {eu} eu
        </span>
      </p>
    );
  }

  if (gender === 'hombre' && type === 'zapatos') {
    return (
      <p onClick={() => onHandleClick(measurement)}>
        <span className="bg-indigo-100 text-indigo-800 font-medium  px-2.5 py-0.5 rounded">
          {size} cm
        </span>{' '}
        |{' '}
        <span className="bg-indigo-100 text-indigo-800 font-medium  px-2.5 py-0.5 rounded">
          {us} us
        </span>{' '}
        |{' '}
        <span className="bg-indigo-100 text-indigo-800 font-medium  px-2.5 py-0.5 rounded">
          {uk} uk
        </span>{' '}
        |{' '}
        <span className="bg-indigo-100 text-indigo-800 font-medium  px-2.5 py-0.5 rounded">
          {eu} eu
        </span>
      </p>
    );
  }

  if (category === 'pantalones') {
    return (
      <p onClick={() => onHandleClick(measurement)}>
        <span className="bg-indigo-100 text-indigo-800 font-medium  px-2.5 py-0.5 rounded">
          {' '}
          {size}
        </span>{' '}
        |{' '}
        <span className="bg-indigo-100 text-indigo-800 font-medium  px-2.5 py-0.5 rounded">
          {' '}
          {waist} cm
        </span>{' '}
        |{' '}
        <span className="bg-indigo-100 text-indigo-800 font-medium  px-2.5 py-0.5 rounded">
          {' '}
          {long} cm
        </span>
      </p>
    );
  }

  if (gender === 'hombre' && type === 'ropa') {
    return (
      <p onClick={() => onHandleClick(measurement)}>
        <span className="bg-indigo-100 text-indigo-800 font-medium  px-2.5 py-0.5 rounded">
          {' '}
          {size}
        </span>
      </p>
    );
  }
};
