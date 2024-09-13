import { Button } from '@/components/ui';
import { IColor } from '@/interfaces';
import { useCreateProductStore, useModalStore } from '@/stores';
import clsx from 'clsx';
import { useState } from 'react';

type Props = {
  colors: IColor[];
};

export const ColorSelect = ({ colors }: Props) => {
  const [selectColor, setSelectColor] = useState<IColor[]>([]);
  const setColor = useCreateProductStore((store) => store.setColors);

  const closeModal = useModalStore((state) => state.closeModal);

  const handleChange = (color: IColor, isChecked: boolean) => {
    let draft = structuredClone(selectColor);

    if (isChecked) {
      draft.push(color);

      setSelectColor([...draft]);
    } else {
      draft = draft.filter((resp) => color.id !== resp.id);

      setSelectColor(draft);
    }
  };

  return (
    <>
      {selectColor.length >= 2 ? (
        <div
          className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
          role="alert"
        >
          Has seleccionado el máximo de opciones
        </div>
      ) : (
        <div
          className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50"
          role="alert"
        >
          Elige hasta
          <span className="font-medium"> 2 colores</span>
        </div>
      )}

      {colors.map((color) => {
        return (
          <label
            className="flex justify-between items-center py-4 border-b cursor-pointer"
            key={color.id}
            htmlFor={`${color.id}`}
          >
            <div className="flex items-center">
              <span
                className={`inline-block w-7 h-7 rounded-full border mr-4`}
                style={{
                  backgroundColor:
                    color.codeColor !== 'multicolor'
                      ? `#${color.codeColor}`
                      : undefined,
                  backgroundImage:
                    color.codeColor === 'multicolor'
                      ? 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)'
                      : undefined,
                }}
              ></span>
              {color.name}
            </div>

            <input
              disabled={
                selectColor.length >= 2 &&
                !selectColor.find((resp) => resp.id === color.id)
              }
              className="w-5 h-5 bg-primary text-primary"
              id={`${color.id}`}
              onChange={(e) => handleChange(color, e.target.checked)}
              name={color.name}
              value={color.id}
              type="checkbox"
            />
          </label>
        );
      })}

      <footer>
        <Button
          disabled={selectColor.length === 0}
          type="button"
          label={'Listo'}
          onClick={() => {
            setColor(selectColor);
            closeModal();
          }}
        />
      </footer>
    </>
  );
};
