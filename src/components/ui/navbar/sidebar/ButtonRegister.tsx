import { useModalAuth, useSidebar } from '@/stores';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export const ButtonRegister = () => {
  const pathName = usePathname();
  const sideMenu = useSidebar((state) => state.onSidebarOpen);
  const { openModal } = useModalAuth();

  const onHandleClick = () => {
    sideMenu();
    openModal();
  };

  const shouldRenderButton = useMemo(() => {
    return (
      !pathName.includes('/auth/login') && !pathName.includes('/auth/register')
    );
  }, [pathName]);

  if (!shouldRenderButton) return null;

  return (
    <button
      onClick={onHandleClick}
      className="inline-block text-center border border-cerise-red-700 text-cerise-red-700 w-full font-medium text-sm px-5 py-2.5 rounded"
    >
      Iniciar sesión | Regístrate
    </button>
  );
};
