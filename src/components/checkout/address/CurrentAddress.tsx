import { IAddress } from '@/interfaces';
import { UpdateFormAddress } from './UpdateForm';

type Props = {
  address: IAddress;
};

export const CurrentAddress = ({ address }: Props) => {
  return (
    <>
      <div className="bg-white border p-6 rounded shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-gray-400">Dirección</h2>
          <UpdateFormAddress address={address} />
        </div>
        <div className="space-y-2">
          <p className="text-lg">{address?.fullName}</p>
          <p className="flex flex-col md:flex-row gap-1">
            <span>{address?.fullAddress}</span>
            <span>
              {address?.city}, {address?.country}
            </span>
          </p>

          <p>
            <span>+502 </span>
            {address?.phone}
          </p>
        </div>
      </div>
    </>
  );
};
