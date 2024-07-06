import { InboxMainComponent } from '@/components';

type Props = {
  searchParams: { username: string };
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
