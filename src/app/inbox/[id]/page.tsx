import { InboxMainComponent } from '@/components';
import { Metadata } from 'next';

type Props = {
  searchParams: { username: string };
};

export const metadata: Metadata = {
  title: 'Inbox',
};
export default async function InboxPage({ searchParams: { username } }: Props) {
  return (
    <div className="main-wrapper min-h-[70vh]">
      <InboxMainComponent />
    </div>
  );
}
/* 

*/
