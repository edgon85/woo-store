import { IPackageDelivery } from '@/interfaces';
import { useModalStore } from '@/stores';
import { useState } from 'react';

type Props = {
  data: IPackageDelivery[];
};

export const PackageDeliverySelect = ({ data }: Props) => {
  const [selectPackageDelivery, setSelectPackageDelivery] = useState<
    IPackageDelivery[]
  >([]);

  const closeModal = useModalStore((state) => state.closeModal);

  const handleChange = (
    packageDelivery: IPackageDelivery,
    isChecked: boolean
  ) => {
    let draft = structuredClone(selectPackageDelivery);

    if (isChecked) {
      draft.push(packageDelivery);

      setSelectPackageDelivery([...draft]);
    } else {
      draft = draft.filter((resp) => packageDelivery.id !== resp.id);

      setSelectPackageDelivery(draft);
    }
  };

  return (
    <>
      {data.map((packageDelivery) => {
        return (
          <label
            className="flex justify-between items-center py-4 border-b cursor-pointer"
            key={packageDelivery.id}
            htmlFor={`${packageDelivery.id}`}
          >
            <div className="flex items-center">{packageDelivery.name}</div>
            <input
              className="w-5 h-5 bg-primary text-primary"
              id={`${packageDelivery.id}`}
              onChange={(e) => handleChange(packageDelivery, e.target.checked)}
              name={packageDelivery.name}
              value={packageDelivery.id}
              type="checkbox"
            />
          </label>
        );
      })}
      <footer className="mt-2">
        <button
          disabled={selectPackageDelivery.length === 0}
          className="w-full py-3 text-white bg-cerise-red-600 hover:bg-cerise-red-500 rounded"
          onClick={() => {
            closeModal();
          }}
        >
          Listo
        </button>
      </footer>
    </>
  );
};
