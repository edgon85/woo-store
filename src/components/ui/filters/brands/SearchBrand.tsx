import { useDebounce } from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export const SearchBrand = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return <div>SearchBrand</div>;
};
