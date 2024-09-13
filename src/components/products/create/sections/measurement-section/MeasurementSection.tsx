import { ItemCreate } from '../ItemCreate';
import { useCreateProductStore, useModalStore } from '@/stores';
import { Measurements } from './Measurements';
import { RulerIcon } from '@/components/ui';
import { formatMeasurementString } from '@/utils';

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
      icon={<RulerIcon />}
      value={formatMeasurementString(measurement!, gender)}
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
