import { useFilter, useFetcher } from '@/hooks';
import { IColor, IBrand } from '@/interfaces';
import {
  IoIosCheckbox,
  IoIosCheckboxOutline,
  IoIosSquare,
  IoIosSquareOutline,
} from 'react-icons/io';

import styles from '../Categories.module.css';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export const BrandsItems = () => {
  const { isBrandSelected, onBrandSelected } = useFilter();

  return (
    <>
      <input
        type="checkbox"
        id="brands"
        className="hidden"
        defaultChecked={isBrandSelected}
      />
      <label
        onClick={() => onBrandSelected()}
        className="text-lg font-bold"
        htmlFor="brands"
      >
        Marca
      </label>

      <div>
        <section className="pl-4">
          <BrandsItem />
        </section>
      </div>
    </>
  );
};

export const BrandsItem = () => {
  const router = useRouter();
  const path = usePathname();
  const { gender, category } = useFilter();

  const [selectBrand, setSelectBrand] = useState<string[]>([]);
  const { data: brands } = useFetcher<IBrand[]>('/brands/all?limit=10');

  const handleChange = (brandSlug: string, isChecked: boolean) => {
    let draft = structuredClone(selectBrand);
    if (isChecked) {
      draft.push(brandSlug);

      setSelectBrand([...draft]);

      draft.length !== 0
        ? router.push(`/shop/vestidos?brand=${[...draft].join(',')}`)
        : router.push(`/${gender}/${category.slug}`);
    } else {
      draft = draft.filter((resp) => brandSlug !== resp);

      setSelectBrand(draft);

      draft.length !== 0
        ? router.push(`/shop/vestidos?brand=${[...draft].join(',')}`)
        : router.push(`/${gender}/${category.slug}`);
    }

    // console.log(path);
  };

  return (
    <>
      {brands.map((brand) => (
        <div key={brand.id}>
          <label htmlFor={brand.slug} className={styles.label}>
            <span className="text-black capitalize hover:text-darkPrimary py-2">
              {brand.title}
            </span>
            {/*   <IoIosSquareOutline size={30} />
            <IoIosCheckboxOutline size={24} /> */}
            <input
              className="!block w-5 h-5 bg-primary text-primary"
              type="checkbox"
              id={brand.slug}
              onChange={(e) => handleChange(brand.slug, e.target.checked)}
            />
          </label>
        </div>
      ))}
    </>
  );
};
/* 
construir esta ruta
http://localhost:3000/shop/vestido?color=red,black,whithe&brand=adidas,american-eagle-outfitters

*/
