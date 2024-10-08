import { ArrowRightIcon } from '@/components/ui';

export const DeleteAccountSection = () => {
  return (
    <div className="bg-white p-4 w-full ">
      <div className=" flex justify-between items-center py-2">
        <div className="flex-1">
          <p className="block text-base font-medium text-gray-700">
            Eliminar mi cuenta
          </p>
        </div>
        <div className="flex-1">
          <button className="p-2 rounded-md ">
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
