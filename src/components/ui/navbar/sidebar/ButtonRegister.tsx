import { useSidebar } from '@/stores';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const ButtonRegister = () => {
  const path = usePathname();
  const sideMenu = useSidebar((state) => state.onSidebarOpen);

  return (
    <Link
      href={`/auth/login?p=${path}`}
      onClick={sideMenu}
      className="inline-block text-center border border-cerise-red-700 text-cerise-red-700 w-full font-medium text-sm px-5 py-2.5 rounded"
    >
      Registrarse | Iniciar sesión
    </Link>
  );
};
