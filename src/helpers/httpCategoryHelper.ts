export const getCategoryByGenderAndType = async (
  gender: string,
  clothesType: string
) => {
  const url = `http://localhost:5000/api/categories?gender=${gender}&type=${clothesType}`;

    console.log(url);
  const resp = await fetch(url);

  if (!resp.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return resp.json();
};
