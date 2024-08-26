import { InboxMainComponent } from '@/components/inbox/InboxMainComponent';
import { Metadata } from 'next';

type Props = {
  searchParams: { u: string; n: string };
};

export const metadata: Metadata = {
  title: 'Inbox',
};

export default async function InboxPage({ searchParams }: Props) {
  return (
    <div className="mt-4">
      <InboxMainComponent
        recipientId={searchParams.u}
        username={searchParams.n}
      />
    </div>
  );
}
