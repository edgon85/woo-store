import { getSubcategories } from '@/actions';
import { useModal } from '@/hooks';
import { ISubcategory } from '@/interfaces';
import { useEffect, useState } from 'react';
import { IoIosCheckmark } from 'react-icons/io';

type Props = {
  //  gender: string;
  category: string;
  subcategoryId: string;
  setSubcategory: (subcategory: ISubcategory) => void;
};

export const SelectSubcategory = ({
  // gender,
  category,
  subcategoryId,
  setSubcategory,
}: Props) => {
  const { onCloseModal } = useModal();

  const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);

  const handleOnclick = (subcategory: ISubcategory) => {
    setSubcategory(subcategory);
    onCloseModal();
  };

  useEffect(() => {
    getSubcategoryData(category);
  }, [category]);

  const getSubcategoryData = async (categoryId: string) => {
    
    const data = await getSubcategories(categoryId);
    setSubcategories(data);
  };

  return (
    <div className="flex flex-col">
      {subcategories.map((subCat) => (
        <div
          key={subCat.id}
          onClick={() => handleOnclick(subCat)}
          className={`flex justify-between items-center 'text-darkPrimary border-b py-4 cursor-pointer`}
        >
          <span>{subCat.title}</span>
          {subCat.id === subcategoryId! ? (
            <IoIosCheckmark size={24} color="var(--primary)" />
          ) : null}
        </div>
      ))}
    </div>
  );
};
