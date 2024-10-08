import { CheckMark } from '@/components/ui';
import { useFetcher } from '@/hooks';
import { ICategory } from '@/interfaces';
import { useCreateProductStore, useModalStore } from '@/stores';

type Props = {
  gender: string;
  clothesType: string;
};

export const SelectCategory = ({ gender, clothesType }: Props) => {
  const setCategory = useCreateProductStore((state) => state.setCategory);
  const setSubcategory = useCreateProductStore((state) => state.setSubcategory);
  const category = useCreateProductStore((state) => state.category);

  const closeModal = useModalStore((state) => state.closeModal);

  const { data: categories } = useFetcher<ICategory[]>(
    `/categories?gender=${gender}&type=${clothesType}`
  );

  const handleOnclick = (category: ICategory) => {
    setCategory(category);
    setSubcategory(null);
    closeModal();
  };

  return (
    <div className="flex flex-col">
      {categories.map((cat) => (
        <div
          key={cat.id}
          onClick={() => handleOnclick(cat)}
          className={`flex justify-between items-center 'text-darkPrimary border-b py-4 cursor-pointer`}
        >
          <span className="capitalize">{cat.title}</span>
          {cat.id === category?.id ? (
            <CheckMark className="text-cerise-red-600 w-6 h-6" />
          ) : null}
        </div>
      ))}
    </div>
  );
};
