import { useFilter } from '@/hooks';
import { BrandsItem } from './BrandsItem';

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
        <section className="pl-4  max-h-64 overflow-scroll">
          <BrandsItem />
        </section>
      </div>
    </>
  );
};
