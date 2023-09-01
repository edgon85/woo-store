

export const getProductByUser = async (userId: string) => {
  const url = `${process.env.API_BASE_URL}/products/u/${userId}`;

  console.log(url);
  const res = await fetch(url);

 if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json();
};
