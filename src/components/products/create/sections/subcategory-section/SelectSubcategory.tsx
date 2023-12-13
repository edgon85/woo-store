import { useFetcher, useModal } from '@/hooks';
import { ISubcategory } from '@/interfaces';
import { useCreateProductStore, useModalStore } from '@/stores';
import { IoIosCheckmark } from 'react-icons/io';

export const SelectSubcategory = () => {
  const closeModal = useModalStore((state) => state.closeModal);

  const category = useCreateProductStore((state) => state.category);
  const subcategory = useCreateProductStore((state) => state.subcategory);
  const setSubcategory = useCreateProductStore((state) => state.setSubcategory);

  const { data: subcategories } = useFetcher<ISubcategory[]>(
    `/subcategories?category=${category?.id}`
  );

  const handleOnclick = (subcategory: ISubcategory) => {
    setSubcategory(subcategory);
    closeModal();
  };

  return (
    <div className="flex flex-col">
      {subcategories.map((sub) => (
        <div
          key={sub.id}
          onClick={() => handleOnclick(sub)}
          className={`flex justify-between items-center 'text-darkPrimary border-b py-4 cursor-pointer`}
        >
          <span className="capitalize">{sub.title}</span>
          {sub.id === subcategory?.id ? (
            <IoIosCheckmark size={24} color="var(--primary)" />
          ) : null}
        </div>
      ))}
    </div>
  );
};
