import { useCreateProductStore, useModalStore } from '@/stores';
import { ItemCreate } from '../ItemCreate';
import { MunicipalityState } from './MunicipalityState';
import { FaMapMarkerAlt } from 'react-icons/fa';

export const MunicipalitySection = () => {
  const municipality = useCreateProductStore((state) => state.municipality);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <ItemCreate
      title="Municipio"
      icon={FaMapMarkerAlt}
      value={municipality?.name!}
      onClick={() =>
        openModal(
          <div className=" w-72 md:w-96 p-4">
            <MunicipalityState />
          </div>
        )
      }
    />
  );
};
