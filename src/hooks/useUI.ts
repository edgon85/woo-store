import { useEffect, useState } from 'react';

type Props = {
  url?: string;
};

const dataGender = [
  { id: 'female', title: 'mujer' },
  { id: 'male', title: 'hombre' },
  //   { id: 'children', title: 'niños' },
];
const dataClothesType = [
  { id: 'ropa', title: 'ropa' },
  { id: 'zapatos', title: 'zapatos' },
  { id: 'accesorios', title: 'accesorios' },
];

/* const dataChildren = [
  { id: 'boy', title: 'niño Talla 3 a 16' },
  { id: 'girl', title: 'niña talla 3 a 16' },
  { id: 'babyBoy', title: 'bebe niño 0 a 24 meses' },
  { id: 'babyGirl', title: 'bebe niña 0 a 24 meses' },
]; */

export const useUI = ({ url = '' }: Props) => {
  const [selectData, setSelectData] = useState<any[]>([]);
  const [errorSelectData, setErrorSelectData] = useState(null);
  const [loadingSelectData, setLoadingSelectData] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    switch (url) {
      case '/gender':
        setSelectData(dataGender);
        break;
      /* case '/children':
        setSelectData(dataChildren);
        break; */

      case '/type':
        setSelectData(dataClothesType);
        break;
      case '':
        break;
      default:
        getData(url, signal);
        break;
    }

    return () => abortController.abort();
  }, [url]);

  const getData = async (url: string, signal: AbortSignal) => {
    setLoadingSelectData(true);
    try {
      const resp = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        signal,
      });

      if (!resp.ok) {
        let err: any = new Error('Error en la petición Fetch');
        err.status = resp.status || '00';
        err.statusText = resp.statusText || 'Ocurrió un error';
        throw err;
      }

      const data = await resp.json();

      if (!signal.aborted) {
        setSelectData(data);
        setErrorSelectData(null);
      }
    } catch (error: any) {
      if (!signal.aborted) {
        setSelectData([]);
        setErrorSelectData(error);
      }
    } finally {
      if (!signal.aborted) {
        setLoadingSelectData(false);
      }
    }
  };

  return {
    selectData,
    errorSelectData,
    loadingSelectData,
  };
};
