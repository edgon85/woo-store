import { getCategories } from '@/actions';
import { useModal } from '@/hooks';
import { ICategory } from '@/interfaces';
import { useEffect, useState } from 'react';
import { IoIosCheckmark } from 'react-icons/io';

type Props = {
  gender: string;
  clothesType: string;
  categoryId: string;
  setCategory: (category: ICategory) => void;
};

export const SelectCategory = ({
  gender,
  clothesType,
  categoryId,
  setCategory,
}: Props) => {
  const { onCloseModal } = useModal();

  const [categories, setCategories] = useState<ICategory[]>([]);

  const handleOnclick = (category: ICategory) => {
    setCategory(category);
    onCloseModal();
  };

  useEffect(() => {
    getCategoryData(gender, clothesType);
  }, [gender, clothesType]);

  const getCategoryData = async (gender: string, type: string) => {
    const data = await getCategories(gender, type);
    setCategories(data);
  };

  return (
    <div className="flex flex-col">
      {categories.map((cat) => (
        <div
          key={cat.id}
          onClick={() => handleOnclick(cat)}
          className={`flex justify-between items-center 'text-darkPrimary border-b py-4 cursor-pointer`}
        >
          <span>{cat.title}</span>
          {cat.id === categoryId! ? (
            <IoIosCheckmark size={24} color="var(--primary)" />
          ) : null}
        </div>
      ))}
    </div>
  );
};
