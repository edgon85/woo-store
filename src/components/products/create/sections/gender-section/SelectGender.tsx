import { CheckMark } from '@/components/ui';
import { useModalStore } from '@/stores';

type Props = {
  gender: string;
  onGenderChange: (value: string) => void;
};

export const SelectGender = ({ gender, onGenderChange }: Props) => {
  const closeModal = useModalStore((state) => state.closeModal);

  const handleOnclick = (value: string) => {
    onGenderChange(value);
    closeModal();
  };
  return (
    <div className="flex flex-col">
      <div
        onClick={() => handleOnclick('mujer')}
        className={`flex justify-between items-center 'text-darkPrimary border-b py-4 cursor-pointer`}
      >
        <span>Mujer</span>
        {gender === 'mujer' ? (
          <CheckMark className="text-cerise-red-600" />
        ) : null}
      </div>
      <div
        onClick={() => handleOnclick('hombre')}
        className={`flex justify-between items-center 'text-darkPrimary border-b py-4 cursor-pointer`}
      >
        <span>Hombre</span>
        {gender === 'hombre' ? (
          <CheckMark className="text-cerise-red-600" />
        ) : null}
      </div>
    </div>
  );
};
