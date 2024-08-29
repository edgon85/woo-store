'use client';
import { updateEmailPreferences } from '@/actions';
import { IEmailPreference } from '@/interfaces';
import React, { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
  title: string;
  preferenceValue: boolean;
  preferenceKey: string;
};

export const EmailPreferenceItem = ({
  title,
  preferenceValue,
  preferenceKey,
}: Props) => {
  const [checkBoxValue, setCheckBoxValue] = useState(preferenceValue);

  const handleCheckboxChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setCheckBoxValue(evt.target.checked);
    updateEmailPreference(evt.target.checked);
  };

  const updateEmailPreference = async (value: boolean) => {
    const dataToUpdate: IEmailPreference = {
      [preferenceKey]: value,
    };

    const { ok, message } = await updateEmailPreferences(dataToUpdate);

    if (!ok) {
      toast.error(message);
    } else {
      toast.success('Preferencias actualizadas');
    }
  };

  return (
    <div className="bg-white p-4 w-full ">
      <div className=" flex justify-between items-center py-2">
        <div className="flex-1">
          <p className="block text-base font-medium text-gray-700">{title}</p>
        </div>
        <div className="flex-1">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={checkBoxValue}
              onChange={handleCheckboxChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lightPrimary rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-primary"></div>
            {/* <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Toggle me
            </span> */}
          </label>
        </div>
      </div>
    </div>
  );
};
