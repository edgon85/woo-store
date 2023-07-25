import { useModal } from '@/hooks';
import { IClothesState } from '@/interfaces';
import { IoIosCheckmark } from 'react-icons/io';

const clothesStates: IClothesState[] = [
  {
    id: 'nuevo-con-etiqueta',
    title: 'Nuevo con etiquetas',
    subtitle:
      'Articulo sin estrenar que aun tiene las etiquetas o está en su empaque original',
  },
  {
    id: 'nuevo-sin-etiquetas',
    title: 'nuevo sin etiquetas',
    subtitle:
      'Articulo sin estrenar que no tiene etiquetas o el empaque original',
  },
  {
    id: 'puesto-una-vez',
    title: 'Puesto una vez',
    subtitle: 'El articulo solo se a usado una vez',
  },
  {
    id: 'muy-bueno',
    title: 'Muy bueno',
    subtitle: 'Articulo usado que puede tener algún defecto menor',
  },
  {
    id: 'usado',
    title: 'Usado',
    subtitle: 'Articulo usado que puede tener defectos o estar desgastado',
  },
  {
    id: 'satisfactorio',
    title: 'Satisfactorio',
    subtitle: 'Articulo bastante usado con defectos o desgaste',
  },
];

type Props = {
  setClothesState: (state: IClothesState) => void;
  clothesSelected: string;
};

export const ClothesState = ({ setClothesState, clothesSelected }: Props) => {
  const { onCloseModal } = useModal();

  const handleClick = (clothesState: IClothesState) => {
    setClothesState(clothesState);
    onCloseModal();
  };

  return (
    <ul>
      {clothesStates.map((resp) => (
        <li
          onClick={() => handleClick(resp)}
          className="flex justify-between items-center px-1 py-2 border-b cursor-pointer hover:bg-lightPrimary"
          key={resp.id}
        >
          <div className="">
            <h6 className="text-lg">{resp.title}</h6>
            <p className="text-gray-500">{resp.subtitle}</p>
          </div>
          {clothesSelected === resp.id ? (
            <IoIosCheckmark size={24} color="var(--primary)" />
          ) : null}
        </li>
      ))}
    </ul>
  );
};
