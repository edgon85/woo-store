import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { SelectList } from '../ui/SelectList';

type Props = {
  setClothesData: ({}: any) => void;
};

export const SelectsCategories = ({ setClothesData }: Props) => {
  const [gender, setGender] = useState('');
  const [clothesType, setClothesType] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');

  useEffect(() => {
    setClothesData({
      gender,
      clothesType,
      category,
      subCategory,
    });
  }, [category, clothesType, gender, setClothesData, subCategory]);

  return (
    <>
      <div>
        <SelectList
          labelTitle="Seleccione Genero"
          title="genero"
          handleChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setGender(e.target.value)
          }
          /* handleChange={(e: ChangeEvent<HTMLInputElement>) =>
        setGender(e.target.value)
    } */
          // url="http://localhost:5000/api/categories"
          url="/gender"
        />
      </div>
      {gender && (
        <div>
          <SelectList
            labelTitle="Seleccione tipo"
            title="tipo"
            handleChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setClothesType(e.target.value)
            }
            // url="http://localhost:5000/api/categories"
            url={gender !== 'niños' ? '/type' : '/children'}
          />
        </div>
      )}

      {clothesType && (
        <div>
          <SelectList
            labelTitle="Seleccione Categoría"
            title="categoría"
            handleChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setCategory(e.target.value)
            }
            url={`http://localhost:5000/api/categories/${gender}/${clothesType}`}
          />
        </div>
      )}
      {category && (
        <div>
          <SelectList
            labelTitle="Seleccione Categoría"
            title="categoría"
            handleChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setSubCategory(e.target.value)
            }
            url={`http://localhost:5000/api/subcategories/${gender}/${category}`}
          />
        </div>
      )}
    </>
  );
};
