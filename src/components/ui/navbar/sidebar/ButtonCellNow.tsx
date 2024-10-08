import { useCreateProductStore, useSidebar } from '@/stores';
import { useRouter } from 'next/navigation';

export const ButtonCellNow = () => {
  const router = useRouter();
  const setMenuOpen = useSidebar((state) => state.onSidebarOpen);
  const resetCreateProdSt = useCreateProductStore((state) => state.resetStore);

  const onHandleClick = () => {
    resetCreateProdSt();
    router.push('/product/create');
    setMenuOpen();
  };

  return (
    <button
      onClick={onHandleClick}
      type="button"
      className="inline-flex w-full items-center justify-center bg-gradient-to-r from-cerise-red-500 to-cerise-red-600 hover:bg-gradient-to-br hover:from-cerise-red-600 hover:to-cerise-red-700 text-white font-medium rounded text-xs px-3 py-2 focus:outline-none"
    >
      VENDER AHORA
    </button>
  );
};
