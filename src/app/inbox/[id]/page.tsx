import { getUserProfile } from '@/actions';
import { InboxComponent } from '@/components/inbox/InboxComponent';

type Props = {
  params: { id: string };
  searchParams: { username: string };
};

export default async function InboxPage({
  params: { id },
  searchParams: { username },
}: Props) {
  const user = await getUserProfile(username);

  console.log(user);
  return (
    <div className="main-wrapper min-h-[70vh]">
      <InboxComponent
        currentId={id}
        username={username}
        recipientId={user.data.id}
      />
    </div>
  );
}
/* 

*/
