import { useCreateProductStore, useSidebar } from '@/stores';
import { useRouter } from 'next/navigation';

export const ButtonCellNow = () => {
  const router = useRouter();
  const setMenuOpen = useSidebar((state) => state.onSidebarOpen);
  const resetCreateProdSt = useCreateProductStore((state) => state.resetStore);

  const onHandleClick = () => {
    resetCreateProdSt();
    router.push('/products/create');
    setMenuOpen();
  };

  return (
    <button
      onClick={onHandleClick}
      type="button"
      className="inline-flex items-center justify-center bg-cerise-red-600 text-white hover:bg-cerise-red-500 font-medium rounded text-xs px-3 py-1.5 mr-2  focus:outline-none"
    >
      VENDER AHORA
    </button>
  );
};
/* 
items-center justify-center bg-cerise-red-600 text-white hover:bg-cerise-red-500 font-medium rounded-lg text-xs px-3 py-1.5 mr-2  focus:outline-none
*/
