'use client';
import { useModalStore } from '@/stores';
import { ItemCreate } from '../ItemCreate';
import { IProfile } from '@/interfaces';
import { AddressForm } from './AddressForm';
import { useEffect, useState } from 'react';

type Props = {
  profile: IProfile;
};

export const AddressSection = ({ profile }: Props) => {
  const openModal = useModalStore((state) => state.openModal);
  const { address } = profile;

  const [currentAddress, setCurrentAddress] = useState<string | null>(address!);

  useEffect(() => {
    setCurrentAddress(address!);
  }, [address]);

  return (
    <ItemCreate
      title="Dirección"
      subtitle={
        address
          ? `Dirección para el servicio de recolección`
          : `Dirección para el servicio de recolección`
      }
      value={currentAddress || 'puede agrear después'}
      onClick={() =>
        openModal(
          <AddressForm
            profile={profile}
            setCurrentAddress={setCurrentAddress}
          />,
          `${address ? 'Actualizar dirección' : 'Agregar dirección'}`
        )
      }
    />
  );
};
