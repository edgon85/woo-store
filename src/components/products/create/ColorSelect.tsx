// import { colors } from '@/assets/data';
import { Button } from '@/components/ui';
import { getAllColors } from '@/helpers/httpHelper';
import { useModal } from '@/hooks';
import { IColor } from '@/interfaces';
import { MouseEvent, use, useEffect, useState } from 'react';

import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';
import { IconBaseProps } from 'react-icons/lib';

type Props = {
  setColor: (color: IColor[]) => void;
  colorSelect: IColor[];
};

export const ColorSelect = ({ setColor, colorSelect }: Props) => {
  const [selectColor, setSelectColor] = useState<IColor[]>([]);
  const [colors, setColors] = useState<IColor[]>([]);
  const { onCloseModal } = useModal();

  useEffect(() => {
    fetchColors();
  }, []);

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

  const fetchColors = async () => {
    const  data = await getAllColors();
    setColors(data);
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
        const codeColor = `#${color.codeColor}`;

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
                  background: `${
                    codeColor === 'multicolor'
                      ? 'radial-gradient(red, orange, #ff0, pink, black, #00f, purple, red)'
                      : codeColor
                  }`,
                }}
              ></span>
              {color.name}
            </div>
            {/* <GrCheckbox size={24} lightingColor={'red'} /> */}
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
            onCloseModal();
          }}
        />
      </footer>
    </>
  );
};
