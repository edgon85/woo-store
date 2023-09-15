export const getProductByUser = async (userId: string) => {
  const url = `${process.env.API_BASE_URL}/products/u/${userId}`;

  console.log(url);
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

/* export const useFetchSubcategoryBySlug = (
  subcategorySlug: string,
  config: SWRConfiguration = {}
) => {
  const url = `http://localhost:5000/api/products/subcategory/${subcategorySlug}`;

  const { data, error, isLoading } = useSWR<ISubcategory[]>(url, config);

  return {
    subcategories: data || [],
    loading: !error && !data,
    isError: !error,
  };
}; */
