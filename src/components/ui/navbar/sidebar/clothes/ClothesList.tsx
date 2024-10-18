
import { ICategory } from '@/interfaces';
import { usePersonalPreferencesStore, useSidebar } from '@/stores';
import { useRouter } from 'next/navigation';

type Props = {
  articleType: string;
  categories: ICategory[];
};

export const ClothesList = ({ articleType, categories }: Props) => {
  const gender = usePersonalPreferencesStore((state) => state.gender);
  const router = useRouter();
  const sidebarMenu = useSidebar((state) => state.onSidebarOpen);

  return (
    <>
      {categories.map((category: ICategory) => (
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
