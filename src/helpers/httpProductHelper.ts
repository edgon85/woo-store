import { IProduct } from '@/interfaces';

export const getProductByUserIdOrUsername = async (userId: string) => {
  const url = `${process.env.API_BASE_URL}/products/u/${userId}`;


  const res = await fetch(url);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export const getProductByGenderAndCategory = async (
  gender: string,
  categorySlug: string
) => {
  const url = `${process.env.API_BASE_URL}/products?gender=${gender}&category=${categorySlug}`;

  const res = await fetch(url);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export const getProductsBySubcategory = async (subcategorySlug: string) => {
  const url = `${process.env.API_BASE_URL}/products/subcategory/${subcategorySlug}`;

  const res = await fetch(url);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export const getProductBySlug = async (
  productSlug: string
): Promise<IProduct> => {
  const url = `${process.env.API_BASE_URL}/products/${productSlug}`;

  const resp = await fetch(url);

  if (!resp.ok) {
    throw new Error('Failed to fetch data');
  }

  const data: IProduct = await resp.json();
  return data;
};
