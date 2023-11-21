import Link from 'next/link';

type Props = {
  label: string;
  subLabel: string;
  path: string;
  btnText: string;
};

export const EmptyTransaction = ({ label, subLabel, path, btnText }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">{label}</h2>
      <p className="text-gray-600 mb-4">{subLabel}</p>
      <Link
        href={path}
        className="text-white bg-primary hover:bg-pink-600 font-semibold py-2 px-4 rounded"
      >
        {btnText}
      </Link>
    </div>
  );
};
