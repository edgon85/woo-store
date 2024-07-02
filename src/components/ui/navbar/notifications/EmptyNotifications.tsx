import React from "react";

export const EmptyNotifications = () => {
  return (
    <div className="min-w-96 min-h-52">
      <div className="flex flex-col items-center justify-center h-52">
        <p className="text-sm ">No hay notificaciones</p>
        <p className="text-sm text-gray-400">Aquí veras tus notificaciones</p>
      </div>
    </div>
  );
};
