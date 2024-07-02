import { INotification } from "@/interfaces";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useContext } from "react";
import { SocketContext } from "@/context";

type Props = {
  notification: INotification;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>
};

export const ListNotification = ({ notification, setIsCollapsed }: Props) => {
  const router = useRouter();
  const { markNotificationAsRead } = useContext(SocketContext);

  const onHandleClick = async () => {
    markNotificationAsRead(notification.id);
    setIsCollapsed(false);
    router.push(`/product/${notification.url}`);
  };
  return (
    <li>
      <button
        onClick={onHandleClick}
        className={`flex items-center justify-between w-full p-2
            ${
              notification.read ? "bg-white" : "bg-gray-100"
            }, hover:bg-gray-100`}
      >
        <span>{notification.message}</span>
      </button>
    </li>
  );
};
