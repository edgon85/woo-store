import { useFetcher } from '@/hooks';
import { IMeasurement } from '@/interfaces';
import { useCreateProductStore, useModalStore } from '@/stores';

type Props = {
  gender: string;
  clothesType: string;
};

export const Measurements = ({ gender, clothesType }: Props) => {
  const closeModal = useModalStore((state) => state.closeModal);

  const category = useCreateProductStore((state) => state.category);
  const setMeasurements = useCreateProductStore(
    (state) => state.setMeasurement
  );

  const { data: measurements } = useFetcher<IMeasurement[]>(
    `/measurements?gender=${gender}&type=${clothesType}`
  );

  const handleClick = (size: IMeasurement) => {
    setMeasurements({ ...size });
    closeModal();
  };

  return (
    <>
      <ul className="text-sm font-medium uppercase">
        {measurements
          .sort((a, b) => a.id - b.id)
          .map((measurement) => {
            const { id } = measurement;
            return (
              <li
                onClick={() => handleClick(measurement)}
                key={id}
                className="w-full px-4 py-2 border-b border-gray-200  cursor-pointer hover:bg-lightPrimary"
              >
                {formatMeasurementString(
                  measurement,
                  gender,
                  clothesType,
                  category?.title!
                )}
              </li>
            );
          })}
      </ul>
    </>
  );
};

export const formatMeasurementString = (
  measurement: IMeasurement,
  gender: string,
  clothesType: string,
  category: string
): string => {
  if (!measurement) return '';

  const { eu, long, size, uk, us, waist } = measurement;
  let parts: string[] = [];

  if (size !== 'unica') {
    parts.push(size);
    if (['zapatos', 'ropa'].includes(clothesType)) {
      parts.push(`${us} US`, `${eu} EU`);
    }
    if (clothesType === 'zapatos' && gender === 'hombre') {
      parts.push(`${uk} UK`);
    }
    if (category === 'pantalones' && waist && long) {
      parts.push(`${waist} cm`, `${long} cm`);
    }
  }

  return parts.join(' / ');
};
