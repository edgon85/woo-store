import { IDepartment } from '@/interfaces';
import { useCreateProductStore, useModalStore } from '@/stores';
import { IoIosCheckmark } from 'react-icons/io';



type Props = {
  departmentList: IDepartment[];
};

export const DepartmentState = ({ departmentList }: Props) => {
  const setDepartment = useCreateProductStore((state) => state.setDepartment);
  const department = useCreateProductStore((state) => state.department);

  // const { data } = useFetcher<IClothesState[]>(`/clothes-state`);
  const closeModal = useModalStore((state) => state.closeModal);

  const handleClick = (departmentState: IDepartment) => {
    setDepartment(departmentState);
    closeModal();
  };

  return (
    <ul>
      {departmentList.map((resp) => (
        <li
          onClick={() => handleClick(resp)}
          className="flex justify-between items-center px-1 py-2 border-b cursor-pointer hover:bg-lightPrimary"
          key={resp.id}
        >
          <div className="">
            <h6 className="text-lg capitalize">{resp.name}</h6>
            {/* <p className="text-gray-500">{resp.}</p> */}
          </div>
          {department?.id === resp.id ? (
            <IoIosCheckmark size={24} color="var(--primary)" />
          ) : null}
        </li>
      ))}
    </ul>
  );
};