import { ItemCreate } from '../ItemCreate';
import { BsDropletHalf } from 'react-icons/bs';
import { useCreateProductStore, useModalStore } from '@/stores';
import { ColorSelect } from './ColorSelect';
import { IColor } from '@/interfaces';

type Props = {
  colors: IColor[];
};

export const ColorsSection = ({ colors }: Props) => {
  const color = useCreateProductStore((state) => state.colors);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <ItemCreate
      title="Color"
      icon={BsDropletHalf}
      value={
        color?.length === 2
          ? `${color[0].name} y ${color[1].name}`
          : `${color?.length === 0 ? '' : color[0].name}`
      }
      onClick={() =>
        openModal(
          <div className=" w-72 md:w-96 p-4">
            <ColorSelect colors={colors} />
          </div>
        )
      }
    />
  );
};
