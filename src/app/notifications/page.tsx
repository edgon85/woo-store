import { getNotifications } from '@/actions';
import { NotificationList } from '@/components';
export default async function NotificationPage() {
  const { ok, data, message } = await getNotifications();

  return (
    <div className="main-wrapper">
      <div className="max-w-[50vw] mr-auto mt-4">
        <h2 className="text-lg font-semibold ">Notificaciones</h2>
        <NotificationList notifications={data?.notifications} />
      </div>
    </div>
  );
}
