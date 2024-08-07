import { TbTruckDelivery } from 'react-icons/tb';

import { useCreateProductStore, useModalStore } from '@/stores';
import { ItemCreate } from '../ItemCreate';
import { PackageDeliverySelect } from './PackageDeliverySelect';
import { IPackageDelivery } from '@/interfaces';

type Props = {
  data: IPackageDelivery[];
};

export const PackageDeliverySection = ({ data }: Props) => {
  const openModal = useModalStore((state) => state.openModal);

  return (
    <ItemCreate
      title="Paquetería para enviar el producto"
      icon={TbTruckDelivery}
      onClick={() =>
        openModal(
          <div className=" w-72 md:w-96 p-4">
            <p className="text-center my-4 font-semibold">
              Seleccione paqueterías para enviar su prenda
            </p>
            <PackageDeliverySelect data={data} />
          </div>
        )
      }
      value={''}
    />
  );
};
