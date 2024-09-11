import { InboxMainComponent } from '@/components';
import { getAuthInfo } from '@/libs';
import { Metadata } from 'next';

type Props = {
  searchParams: { username: string };
};

export const metadata: Metadata = {
  title: 'Inbox',
};
export default async function InboxPage({ searchParams: { username } }: Props) {
  const userInfo = await getAuthInfo();
  const { id: currentUserId } = userInfo!;

  return (
    <div className="main-wrapper min-h-[70vh]">
      {/*  <InboxMainComponent
        currentUserId={currentUserId}
      /> */}
      <p>No disponible en este momento</p>
    </div>
  );
}
/* 

*/
