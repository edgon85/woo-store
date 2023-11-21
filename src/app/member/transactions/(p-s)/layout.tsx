import { HeadTransaction } from '@/components';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <HeadTransaction />
      <main className='main-wrapper'>{children}</main>
    </>
  );
}
