'use client';

import { useFilter } from '@/hooks';
import { CategoriesItem } from './CategoriesItem';
import { MeasurementFilterItems } from './measurements/MeasurementFilterItems';
import { BrandsItems } from './brands/BrandsItems';
import { ClothesStateFilter } from './clothesState/ClothesStateFilter';
import { ColorFilter } from './colors/ColorFilter';
import { PriceFilter } from './price/PriceFilter';

export const NavCategories = () => {
  const {
    isCategorySelected,
    onCategorySelected,
    isBrandSelected,
    onBrandSelected,
    isMeasurementSelected,
    isClothesStateSelected,
    onMeasurementSelected,
    onClothesStateSelected,
    isColorSelected,
    onColorSelected,
    isPriceSelected,
    onPriceSelected,
  } = useFilter();

  return (
    <div className="p-4">
      <ul className="space-y-2">
        <MenuItem
          title={'Subcategorías'}
          items={<CategoriesItem />}
          isOpen={isCategorySelected}
          onClick={() => onCategorySelected()}
        />
        <MenuItem
          title={'Marcas'}
          items={
            <div className="max-h-64 overflow-scroll">
              <BrandsItems />
            </div>
          }
          isOpen={isBrandSelected}
          onClick={() => onBrandSelected()}
        />
        <MenuItem
          title={'Tallas'}
          items={
            <div className="max-h-64 overflow-scroll">
              <MeasurementFilterItems />
            </div>
          }
          isOpen={isMeasurementSelected}
          onClick={() => onMeasurementSelected()}
        />
        <MenuItem
          title={'Estado'}
          items={
            <div className="max-h-64 overflow-scroll">
              <ClothesStateFilter />
            </div>
          }
          isOpen={isClothesStateSelected}
          onClick={() => onClothesStateSelected()}
        />
        <MenuItem
          title={'Color'}
          items={
            <div className="max-h-64 overflow-scroll">
              <ColorFilter />
            </div>
          }
          isOpen={isColorSelected}
          onClick={() => onColorSelected()}
        />
        <MenuItem
          title={'Precio'}
          items={
            <div className="">
              <PriceFilter />
            </div>
          }
          isOpen={isPriceSelected}
          onClick={() => onPriceSelected()}
        />
      </ul>
    </div>
  );
};

type Props = {
  title: string;
  items: JSX.Element | JSX.Element[];
  isOpen: boolean;
  onClick: () => void;
};
export const MenuItem = ({ title, items, isOpen, onClick }: Props) => {
  return (
    <li>
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 focus:outline-none"
      >
        <span>{title}</span>
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 15l7-7 7 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </button>
      {isOpen && <ul className="">{items}</ul>}
    </li>
  );
};
