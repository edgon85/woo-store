import React from 'react';
import { BsExclamationCircleFill } from 'react-icons/bs';

export const TooltipIcon = () => {
  return (
    <div className="relative group inline-block">
      <div className="text-darkPrimary hover:text-primary">
        <BsExclamationCircleFill />
      </div>

      <div
        className="absolute hidden text-sm bg-white text-darkPrimary shadow rounded group-hover:block z-10 py-1 px-2 "
        style={{
          bottom: '100%',
          left: '50%',
          transform: 'translate(-50%, -10px)',
          minWidth: '300px',
        }}
      >
        En caso de que no recibas tu pedido o te llegue en mal estado, tienes 48
        horas para notificarlo, te devolvemos tu dinero
      </div>
    </div>
  );
};
