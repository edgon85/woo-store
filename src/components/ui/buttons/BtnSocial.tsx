'use client';
import { FacebookIcon, GoogleIcon, SpinnerIcon } from '../icons';

type Provider = string;

type Props = {
  title: string;
  icon?: JSX.Element;
  onVoidAction?: () => void;
  provider: string;
  isLoading: boolean;
};

const providerColors: { [key: string]: string } = {
  google: 'bg-googleColor',
  facebook: 'bg-facebookColor',
};

const providerIcons: { [key: string]: JSX.Element } = {
  facebook: <FacebookIcon />,
  google: <GoogleIcon />,
};

const BASE_BUTTON_CLASSES =
  'text-xs md:text-sm px-1 md:px-0 text-white w-full rounded py-2 uppercase shadow-md flex justify-center items-center gap-2 cursor-pointer';

export const BtnSocial = ({
  title,
  icon,
  provider,
  isLoading,
  onVoidAction,
}: Props) => {
  const selectColor = providerColors[provider] || '';

  return (
    <button
      onClick={onVoidAction}
      className={`${selectColor} ${BASE_BUTTON_CLASSES}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex justify-center items-center">
          <SpinnerIcon className="w-6 h-6 animate-spin" />
        </div>
      ) : (
        <>
          {icon || providerIcons[provider] || null} {title}
        </>
      )}
    </button>
  );
};

// google color #4285F4
