import { useCreateProductStore, useModalStore } from '@/stores';
import { ItemCreate } from '../ItemCreate';
import { SelectGender } from './SelectGender';

type Props = {
  gender: string;
  onGenderChange: (value: string) => void;
};

export const GenderSection = ({ gender, onGenderChange }: Props) => {
  // const gender = useCreateProductStore((state) => state.gender);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <ItemCreate
      title="Genero"
      value={gender}
      onClick={() =>
        openModal(
          <SelectGender gender={gender} onGenderChange={onGenderChange} />,
          'Seleccione Genero'
        )
      }
    />
  );
};
