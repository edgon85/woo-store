import { useFetcher, useModal } from '@/hooks';
import { IClothesState } from '@/interfaces';
import { IoIosCheckmark } from 'react-icons/io';

/* const clothesStates: IClothesState[] = [
  {
    id: 1,
    title: 'Nuevo con etiquetas',
    subtitle:
      'Articulo sin estrenar que aun tiene las etiquetas o está en su empaque original',
  },
  {
    id: 2,
    title: 'Nuevo sin etiquetas',
    subtitle:
      'Articulo sin estrenar que no tiene etiquetas o el empaque original',
  },
  {
    id: 3,
    title: 'Puesto una vez',
    subtitle: 'El articulo solo se a usado una vez',
  },
  {
    id: 4,
    title: 'Muy bueno',
    subtitle: 'Articulo usado que puede tener algún defecto menor',
  },
  {
    id: 5,
    title: 'Usado',
    subtitle: 'Articulo usado que puede tener defectos o estar desgastado',
  },
  {
    id: 6,
    title: 'Satisfactorio',
    subtitle: 'Articulo bastante usado con defectos o desgaste',
  },
]; */



type Props = {
  setClothesState: (state: IClothesState) => void;
  clothesSelected: number;
};

export const ClothesState = ({ setClothesState, clothesSelected }: Props) => {
  const { data } = useFetcher<IClothesState[]>(`/clothes-state`);
  const { onCloseModal } = useModal();

  const handleClick = (clothesState: IClothesState) => {
    setClothesState(clothesState);
    onCloseModal();
  };

  return (
    <ul>
      {data.map((resp) => (
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
