import { CategoriesItemLi } from './CategoriesItemLi';
import { useCategory } from '@/hooks';

export const CategoriesItem = () => {
  const { isCategorySelected, onCategorySelected } = useCategory();

  return (
    <>
      <input
        type="checkbox"
        id="subcategory"
        className="hidden"
        defaultChecked={isCategorySelected}
      />
      <label
        onClick={() => onCategorySelected()}
        className="text-lg font-bold"
        htmlFor="subcategory"
      >
        Subcategorías
      </label>

      <div>
        <ul className="pl-4">
          <CategoriesItemLi />
        </ul>
      </div>
    </>
  );
};
