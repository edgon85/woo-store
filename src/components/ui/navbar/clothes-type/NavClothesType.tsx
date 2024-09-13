import { GenderSelected } from '../../dropdowns';
import { ListClothesType } from './ListClothesType';

export const NavClothesType = () => {
  return (
    <section className="bg-white px-4 lg:px-0 hidden md:block">
      <nav className="main-wrapper pt-4 pb-4 flex justify-between items-center">
        <div className="flex-1">
          <GenderSelected />
        </div>
        <ListClothesType />
        <div className="flex-1"></div>
      </nav>
    </section>
  );
};
