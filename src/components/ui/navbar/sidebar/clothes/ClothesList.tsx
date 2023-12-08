import { useFetcher, useFilter } from '@/hooks';
import { ICategory } from '@/interfaces';
import { useSidebar } from '@/stores';
import { useRouter } from 'next/navigation';

type Props = {
  itemName: string;
};

export const ClothesList = ({ itemName }: Props) => {
  const { gender, clothesType } = useFilter();
  const router = useRouter();
  const sidebarMenu = useSidebar((state) => state.onSidebarOpen);

  const { data: categories } = useFetcher<ICategory[]>(
    `/categories?gender=${gender}&type=${itemName}`
  );

  return (
    <>
      {categories.map((category) => (
        <li key={category.id}>
              <button
                  className='py-2 pl-2 capitalize'
            onClick={() => {
              router.push(`/${gender}/${clothesType}/${category.slug}`);
              sidebarMenu();
            }}
          >
            {category.title}
          </button>
        </li>
      ))}
    </>
  );
};
