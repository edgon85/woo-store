import { getMunicipalitiesAvailable } from '@/actions';
import { CheckMark, SpinnerIcon } from '@/components/ui';
import { IMunicipality } from '@/interfaces';
import { useCreateProductStore, useModalStore } from '@/stores';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const MunicipalityState = () => {
  const { municipality, setMunicipality, department } = useCreateProductStore(
    useCallback(
      (state) => ({
        municipality: state.municipality,
        setMunicipality: state.setMunicipality,
        department: state.department,
      }),
      []
    )
  );
  const closeModal = useModalStore(
    useCallback((state) => state.closeModal, [])
  );

  const [municipalityList, setMunicipalityList] = useState<IMunicipality[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMunicipalities = useCallback(async (departmentSlug: string) => {
    setLoading(true);
    try {
      const { data, ok, message } = await getMunicipalitiesAvailable(
        departmentSlug
      );
      if (ok) {
        setMunicipalityList(data.municipalities);
      } else {
        console.error(message);
      }
    } catch (error) {
      console.error('Error fetching municipalities:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (department?.slug) {
      fetchMunicipalities(department.slug);
    }
  }, [department, fetchMunicipalities]);

  const handleClick = useCallback(
    (muni: IMunicipality) => {
      setMunicipality(muni);
      closeModal();
    },
    [setMunicipality, closeModal]
  );

  const municipalityItems = useMemo(
    () =>
      municipalityList.map((muni: IMunicipality) => (
        <li
          onClick={() => handleClick(muni)}
          className="flex justify-between items-center px-1 py-2 border-b cursor-pointer hover:bg-lightPrimary"
          key={muni.id}
        >
          <div>
            <h6 className="text-lg capitalize">{muni.name}</h6>
          </div>
          {municipality?.id === muni.id && (
            <CheckMark className="text-cerise-red-600" />
          )}
        </li>
      )),
    [municipalityList, municipality, handleClick]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <SpinnerIcon className="animate-spin" />
      </div>
    );
  }

  return <ul>{municipalityItems}</ul>;
};
