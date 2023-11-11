import { AddNewAddress } from './AddNewAddress';
import { IAddress } from '@/interfaces';
import { CurrentAddress } from './CurrentAddress';

type Props = {
  addresses: IAddress[];
};

export const AddressSection = ({ addresses }: Props) => {
  if (addresses.length === 0) {
    return <AddNewAddress />;
  }

  const currentAddress = addresses.find((address) => address.isPrimary);

  return <CurrentAddress address={currentAddress!} />;
};
