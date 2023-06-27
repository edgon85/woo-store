import { signIn } from 'next-auth/react';
import { FacebookIcon, GoogleIcon } from '../icons';

type Props = {
  title: string;
  icon?: JSX.Element;
  onVoidAction?: () => void;
  provider: string;
};

export const BtnSocial = ({ title, icon, provider }: Props) => {
  let selectColor = '';

  switch (provider) {
    case 'google':
      //   selectColor = 'var(--google)';
      selectColor = 'bg-googleColor';
      break;

    case 'facebook':
      selectColor = 'bg-facebookColor';
      break;
  }

  return (
    <button
      onClick={() => signIn(provider)}
      className={`${selectColor} text-white w-full rounded-md py-2 uppercase shadow-md flex justify-center items-center gap-2 cursor-pointer`}
    >
      {provider === 'facebook' ? <FacebookIcon /> : <GoogleIcon />} {title}
    </button>
  );
};

// google color #4285F4
