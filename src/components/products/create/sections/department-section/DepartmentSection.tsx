import { IDepartment } from '@/interfaces';
import { useCreateProductStore, useModalStore } from '@/stores';
import { ItemCreate } from '../ItemCreate';
import { DepartmentState } from './DepartmentState';
import { MapIcon } from '@/components/ui';

type Props = {
  departments: IDepartment[];
};

export const DepartmentSection = ({ departments }: Props) => {
  const department = useCreateProductStore((state) => state.department);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <ItemCreate
      title="Departamento"
      icon={<MapIcon />}
      value={department?.name!}
      onClick={() =>
        openModal(
          <div className=" w-72 md:w-96 p-4">
            <DepartmentState departmentList={departments} />
          </div>
        )
      }
    />
  );
};
