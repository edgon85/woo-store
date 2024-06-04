import { getInboxChats, getUserProfile } from '@/actions';
import { InboxComponent } from '@/components/inbox/InboxComponent';

type Props = {
  searchParams: { username: string };
};

export default async function InboxPage({ searchParams: { username } }: Props) {
  const user = await getUserProfile(username);
  const chats = await getInboxChats();

  // console.log(chats);
  return (
    <div className="main-wrapper min-h-[70vh]">
      <InboxComponent
        username={username}
        recipientId={user.data.id}
        chats={chats.data}
      />
    </div>
  );
}
/* 

*/
