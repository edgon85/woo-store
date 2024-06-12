import { InboxMainComponent } from '@/components/inbox/InboxMainComponent';

type Props = {
  searchParams: { user: string };
};

export default async function InboxPage({ searchParams }: Props) {
  return (
    <>
      <InboxMainComponent recipientId={searchParams.user} />
    </>
  );
}
