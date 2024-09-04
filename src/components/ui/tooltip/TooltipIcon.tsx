import { ExclamationCircleIcon } from '../icons';

type TooltipIconProps = {
  tooltipText?: string;
};

export const TooltipIcon = ({ tooltipText }: TooltipIconProps) => {
  return (
    <div className="relative group inline-block">
      <div className="text-darkPrimary hover:text-primary">
        <ExclamationCircleIcon className="w-5 h-5 text-cerise-red-600" />
      </div>
      <div className="absolute hidden group-hover:block z-10 bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 min-w-[300px]">
        <div className="bg-white text-darkPrimary shadow rounded py-1 px-2 text-sm">
          {tooltipText}
        </div>
      </div>
    </div>
  );
};

TooltipIcon.defaultProps = {
  tooltipText:
    'En caso de que no recibas tu pedido o te llegue en mal estado, tienes 48 horas para notificarlo, te devolvemos tu dinero',
};
