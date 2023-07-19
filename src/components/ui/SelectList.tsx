import { useUI } from '@/hooks';
import { ICategory } from '@/interfaces';
import { ChangeEvent } from 'react';

type Props = {
  labelTitle: string;
  title: string;
  url: string;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectList = ({ title, labelTitle, handleChange, url }: Props) => {
  const { selectData, errorSelectData, loadingSelectData } = useUI({ url });

  if (selectData.length === 0) return <></>;

  return (
    <>
      <label
        htmlFor={`select-${title}`}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {labelTitle}
      </label>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        id={`select-${title}`}
        name={title}
        onChange={(e) => handleChange(e)}
      >
        <option>--Seleccionar {title}--</option>
        {selectData &&
          selectData.map((data: ICategory) => (
            <option key={data.id} value={data.title}>
              {data.title}
            </option>
          ))}
      </select>
    </>
  );
};
