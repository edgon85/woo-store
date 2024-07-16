import { getNotifications } from '@/actions';
import { NotificationList } from '@/components';
export default async function NotificationPage() {
  const { ok, data, message } = await getNotifications();

  return (
    <div className="">
      {ok ? (
        data?.notifications.length > 0 ? (
          <>
            <div className="max-w-[50vw] mr-auto mt-4">
              <h2 className="text-lg font-semibold ">Notificaciones</h2>
              <NotificationList notifications={data?.notifications} />
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center gap-4">
            <p className="text-lg text-gray-600">
              No hay notificaciones en este momento.
            </p>
            <picture>
              <img src="/empty-image.svg" alt="Empty image" width={400} />
            </picture>
          </div>
        )
      ) : (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{message}</span>
        </div>
      )}
    </div>
  );
}
