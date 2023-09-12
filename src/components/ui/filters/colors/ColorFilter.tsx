import { useFetcher, useFilter } from '@/hooks';
import { Filter, IColor } from '@/interfaces';
import { useRouter } from 'next/navigation';

export const ColorFilter = () => {
  const router = useRouter();
  const { gender, category, subcategory, clothesType, filters, setFilters } =
    useFilter();

  const { data } = useFetcher<IColor[]>(`/colors`);

  const handleChange = (colorItem: IColor, isChecked: boolean) => {
    const newFilter: Filter = {
      slug: colorItem.name.replace(/\s+/g, '-'),
      title: colorItem.name,
      type: 'color',
    };

    let draft = structuredClone(filters);
    const subCatPath = subcategory.id !== '' ? `/${subcategory.slug}` : '';

    if (isChecked) {
      draft.push(newFilter);

      const slugs = draft.map((item) => item.slug);
      setFilters([...draft]);

      draft.length !== 0
        ? router.push(
            `/catalog/${gender}/${category.slug}${subCatPath}?filter=${[
              ...slugs,
            ].join(',')}`
          )
        : router.push(`/${gender}/${category.slug}${subCatPath}`);
    } else {
      draft = draft.filter((resp) => newFilter.slug !== resp.slug);

      const slugs = draft.map((item) => item.slug);
      setFilters(draft);

      draft.length !== 0
        ? router.push(
            `/catalog/${gender}/${category.slug}${subCatPath}?filter=${[
              ...slugs,
            ].join(',')}`
          )
        : router.push(`/${gender}/${category.slug}${subCatPath}`);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-2">
      {data.map((color) => {
        const codeColor = `#${color.codeColor}`;
        return (
          <li key={color.id}>
            <label className="text-center cursor-pointer">
              <div
                className={`w-14 h-14  rounded-full mx-auto
                ${
                  filters.some((filter) => filter.title === color.name)
                    ? 'border border-red-950'
                    : ''
                }`}
                style={{
                  background: `${
                    codeColor === 'multicolor'
                      ? 'radial-gradient(red, orange, #ff0, pink, black, #00f, purple, red)'
                      : codeColor
                  }`,
                }}
              ></div>
              <div className="mt-2 capitalize">{color.name}</div>
              <input
                name={color.name}
                value={color.name}
                className="hidden"
                type="checkbox"
                id={color.codeColor}
                onChange={(e) => handleChange(color, e.target.checked)}
              />
            </label>
          </li>
        );
      })}
    </div>
  );
};
