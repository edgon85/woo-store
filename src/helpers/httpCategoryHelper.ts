


/* export const getCategoryByGenderAndType = async (
  gender: string,
  clothesType: string
) => {
  const url = `http://localhost:5000/api/categories?gender=${gender}&type=${clothesType}`;

  const resp = await fetch(url);

  if (!resp.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return resp.json();
}; */

/* export const useFetchCategoryByGenderAndType = (
  gender: string,
  clothesType: string,
  config: SWRConfiguration = {}
) => {
  const url = `http://localhost:5000/api/categories?gender=${gender}&type=${clothesType}`;

  const { data, error, isLoading } = useSWR(url, config);

  return {
    categories: data,
    loading: !error && !data,
    isError: error,
  };
}; */

/* export const useFetchSubcategoryByCategoryId = (
  categoryId: string,
) => {
  const url = `${process.env.API_BASE_URL}/subcategories?category=${categoryId}`;
  // const url = `api/subcategories?category=${categoryId}`;

  console.log(urlBase);
  const { data, error, isLoading } = useSWR<ISubcategory[]>(url);

  return {
    subcategories: data || [],
    loading: !error && !data,
    isError: !error,
  };
}; */
