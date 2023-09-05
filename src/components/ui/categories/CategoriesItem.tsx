import { CategoriesItemLi } from './CategoriesItemLi';

export const CategoriesItem = () => {
  return (
    <>
      <input type="checkbox" id="subcategory" className="hidden" />
      <label className="text-lg font-bold" htmlFor="subcategory">
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
