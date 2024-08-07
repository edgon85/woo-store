import { IAddress } from '@/interfaces';
import { CurrentAddress } from './CurrentAddress';
import { AddressListSection } from './AddressListSection';

type Props = {
  addressList: IAddress[];
};

export const AddressSection = () => {
  return (
    <div className="bg-white border p-6 rounded shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Dirección</h2>
        <AddressListSection />
      </div>
      <CurrentAddress />
    </div>
  );
};
