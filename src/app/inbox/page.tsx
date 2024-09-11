import { InboxMainComponent } from '@/components/inbox/InboxMainComponent';
import { getAuthInfo } from '@/libs';
import { Metadata } from 'next';

type Props = {
  searchParams: { u: string; n: string };
};

export const metadata: Metadata = {
  title: 'Inbox',
};

export default async function InboxPage({ searchParams }: Props) {
  const userInfo = await getAuthInfo();
  const { id: currentUserId } = userInfo!;

  return (
    <div className="mt-4">
      {/* <InboxMainComponent
        recipientId={searchParams.u}
        username={searchParams.n}
        currentUserId={currentUserId}
      /> */}
      <p>No disponible en este momento</p>
    </div>
  );
}
