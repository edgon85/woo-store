
import { ItemCreate } from '../ItemCreate';
import { TbRulerMeasure } from 'react-icons/tb';
import { useCreateProductStore, useModalStore } from '@/stores';
import { Measurements, formatMeasurementString } from './Measurements';


export const MeasurementSection = () => {
  const gender = useCreateProductStore((state) => state.gender);
  const clothesType = useCreateProductStore((state) => state.clothesType);
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
            <Measurements/>
          </div>
        )
      }
    />
  );
};
