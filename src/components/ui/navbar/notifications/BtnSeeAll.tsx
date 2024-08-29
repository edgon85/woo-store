import { useRouter } from 'next/navigation';
import { SetStateAction } from 'react';

type Props = {
  setIsCollapsed: (value: SetStateAction<boolean>) => void;
};

export const BtnSeeAll = ({ setIsCollapsed }: Props) => {
  const router = useRouter();
  return (
    <div className="border-t w-full">
      <button
        onClick={() => {
          router.push('/member/notifications');
          setIsCollapsed(false);
        }}
        className="w-full p-4 rounded-lg"
      >
        Ver todo
      </button>
    </div>
  );
};
