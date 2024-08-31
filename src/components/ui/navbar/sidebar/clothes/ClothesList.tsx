import { useFetcher } from '@/hooks';
import { ICategory } from '@/interfaces';
import { usePersonalPreferencesStore, useSidebar } from '@/stores';
import { useRouter } from 'next/navigation';

type Props = {
  articleType: string;
};

export const ClothesList = ({ articleType }: Props) => {
  const gender = usePersonalPreferencesStore((state) => state.gender);
  const router = useRouter();
  const sidebarMenu = useSidebar((state) => state.onSidebarOpen);

  const { data: categories } = useFetcher<ICategory[]>(
    `/categories?gender=${gender}&type=${articleType}`
  );

  return (
    <>
      {categories.map((category) => (
        <li key={category.id}>
          <button
            className="py-2 pl-2 capitalize"
            onClick={() => {
              router.push(`/catalog/${gender}/${articleType}/${category.slug}`);
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
