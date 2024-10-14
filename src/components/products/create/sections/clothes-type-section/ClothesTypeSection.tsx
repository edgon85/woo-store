import { ItemCreate } from '../ItemCreate';
import { useCreateProductStore, useModalStore } from '@/stores';
import { SelectClothesType } from './SelectClothesType';
import { title } from 'process';

type Props = {
  clothesType: string;
  onClothesTypeChange: (value: string) => void;
};

export const ClothesTypeSection = ({
  clothesType,
  onClothesTypeChange,
}: Props) => {
  // const clothesType = useCreateProductStore((state) => state.clothesType);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <ItemCreate
      title="Tipo de prenda"
      value={clothesType}
      onClick={() =>
        openModal(
          <SelectClothesType
            clothesType={clothesType}
            onClothesTypeChange={onClothesTypeChange}
          />,
          'Seleccione Tipo de Prenda'
        )
      }
    />
  );
};
