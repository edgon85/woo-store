'use client';
import { useAuthStore } from '@/stores';

type Props = {
  icon: JSX.Element;
  onVoidCallback?: () => void;
};

export const BtnCircle = ({ icon, onVoidCallback }: Props) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return (
    <>
      {!isLoggedIn ? null : (
        <button
          onClick={onVoidCallback}
          className="bg-gray-200 hover:bg-gray-300 text-black font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
          type="button"
        >
          {icon}
        </button>
      )}
    </>
  );
};
