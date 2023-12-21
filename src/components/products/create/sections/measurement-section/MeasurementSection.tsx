import { ItemCreate } from '../ItemCreate';
import { TbRulerMeasure } from 'react-icons/tb';
import { useCreateProductStore, useModalStore } from '@/stores';
import { Measurements, formatMeasurementString } from './Measurements';

type Props = {
  gender: string;
  clothesType: string;
};

export const MeasurementSection = ({ gender, clothesType }: Props) => {
  const category = useCreateProductStore((state) => state.category);
  const measurement = useCreateProductStore((state) => state.measurement);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <ItemCreate
      uppercase
      title="Talla"
      icon={TbRulerMeasure}
      value={formatMeasurementString(
        measurement!,
        gender,
        clothesType,
        category?.title!
      )}
      onClick={() =>
        openModal(
          <div className=" w-72 md:w-96 p-4">
            <Measurements gender={gender} clothesType={clothesType} />
          </div>
        )
      }
    />
  );
};
