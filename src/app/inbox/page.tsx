import { InboxMainComponent } from '@/components/inbox/InboxMainComponent';

type Props = {
  searchParams: { u: string; n: string };
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
