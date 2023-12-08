import { useSidebar } from '@/stores';
import { useRouter } from 'next/navigation';

export const ButtonCellNow = () => {
  const router = useRouter();
  const setMenuOpen = useSidebar((state) => state.onSidebarOpen);

  const onHandleClick = () => {
    router.push('/products/create');
    setMenuOpen();
  };

  return (
    <button
      onClick={onHandleClick}
      type="button"
      className="bg-cerise-red-600 text-white w-full font-medium text-sm px-5 py-2.5 rounded"
    >
      VENDER AHORA
    </button>
  );
};
