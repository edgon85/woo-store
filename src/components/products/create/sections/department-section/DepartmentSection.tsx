import { IDepartment } from '@/interfaces';
import { useCreateProductStore, useModalStore } from '@/stores';
import { ItemCreate } from '../ItemCreate';
import { DepartmentState } from './DepartmentState';
import { GiGuatemala } from "react-icons/gi";

type Props = {
  departments: IDepartment[];
};

export const DepartmentSection = ({ departments }: Props) => {
  const department = useCreateProductStore((state) => state.department);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <ItemCreate
      title="Departamento"
      icon={GiGuatemala}
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

/* 
  const { control, watch, setValue, register } = useProductForm('create');

  const [municipalities, setMunicipalities] = useState<IMunicipality[]>([]);

  const selectedDepartment = watch('department');
  const selectedMunicipality = watch('municipality');

  useEffect(() => {
    if (selectedDepartment) {
      fetchMunicipalities(selectedDepartment);
      // Limpiar la selección de municipalidad cuando cambia el departamento
      setValue('municipality', '');
    }
  }, [selectedDepartment, setValue]);

  const fetchMunicipalities = async (department: string) => {
    const { data } = await getMunicipalitiesAvailable(department);
    setMunicipalities(data.municipalities);
  };

  return (
    <>
      <div className="flex gap-4 flex-col md:flex-row justify-between">
        <div className="w-full">
          <label htmlFor="department">Departamento</label>
          <Controller
            name="department"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div>
                <select
                  className="flex-1 w-full p-2 border rounded-md"
                  {...field}
                >
                  <option value="">Seleccione un departamento</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.slug}>
                      {dept.name}
                    </option>
                  ))}
                </select>
                {error && <span>{error.message}</span>}
              </div>
            )}
          />
        </div>

        <div className="w-full">
          <label htmlFor="municipality">Municipio</label>
  
          <Controller
            name="municipality"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div>
                <select
                  className="flex-1 w-full p-2 border rounded-md"
                  {...field}
                  disabled={!selectedDepartment}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                >
                  <option value="">Seleccione un municipio</option>
                  {municipalities.map((muni) => (
                    <option key={muni.slug} value={muni.slug}>
                      {muni.name}
                    </option>
                  ))}
                </select>
                {error && <p>{error.message}</p>}
              </div>
            )}
          />
        </div>
      </div>
    </>
  );
*/
