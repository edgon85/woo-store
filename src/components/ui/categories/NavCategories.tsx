'use client';

import { CategoriesItem } from './CategoriesItem';

type Props = {
  gender: string;
  clothesType: string;
};

export const NavCategories = ({ gender, clothesType }: Props) => {
  return (
    <div className="">
      {/* <h2 className="text-2xl font-semibold mb-4">Categorías</h2> */}
      <div className="accordion">
        {/* <!-- Categoría 1 --> */}
        <div>
          <CategoriesItem gender={gender} clothesType={clothesType} />
          {/* <input type="checkbox" id="category1" className="hidden" />
          <label htmlFor="category1">Subcategoría</label>

          <div>
            <CategoriesItem />
            <CategoriesItem />
          </div> */}
        </div>
        {/* <!-- Marca --> */}
        <input type="checkbox" id="brand" className="hidden" />
        <label htmlFor="brand">Marca</label>
        <div>
          <ul className="pl-4">
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                SubCategoría 2.1
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                SubCategoría 2.2
              </a>
            </li>
          </ul>
        </div>

        {/* <!-- Talla--> */}
        <input type="checkbox" id="measurement" className="hidden" />
        <label htmlFor="measurement">Talla</label>
        <div>
          <ul className="pl-4">
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                SubCategoría 2.1
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                SubCategoría 2.2
              </a>
            </li>
          </ul>
        </div>
        {/* <!-- Estado--> */}
        <input type="checkbox" id="clothes-state" className="hidden" />
        <label htmlFor="clothes-state">Estado</label>
        <div>
          <ul className="pl-4">
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                SubCategoría 2.1
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                SubCategoría 2.2
              </a>
            </li>
          </ul>
        </div>
        {/* <!-- Color--> */}
        <input type="checkbox" id="color" className="hidden" />
        <label htmlFor="color">Color</label>
        <div>
          <ul className="pl-4">
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                SubCategoría 2.1
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                SubCategoría 2.2
              </a>
            </li>
          </ul>
        </div>
        {/* <!-- Precio--> */}
        <input type="checkbox" id="price" className="hidden" />
        <label htmlFor="price">Precio</label>
        <div>
          <ul className="pl-4">
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                SubCategoría 2.1
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                SubCategoría 2.2
              </a>
            </li>
          </ul>
        </div>
        {/* <!-- Agrega más categorías si es necesario --> */}
      </div>
    </div>
  );
};
