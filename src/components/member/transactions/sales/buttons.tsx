'use client';

import { saveAs } from 'file-saver';
import { useRouter } from 'next/navigation';
import { ArrowBarRight, DownLoadIcon } from '@/components/ui';

export const UpdateSale = ({ id }: { id: string }) => {
  const router = useRouter();

  return (
    <button
      className="rounded-md border p-2 hover:bg-gray-100 flex flex-col items-center justify-center"
      onClick={() => router.push(`/settings/transactions/sales/${id}/detail`)}
    >
      <span>Detalles</span>
      <ArrowBarRight />
    </button>
  );
};

export const DownLoadGide = ({
  urlGuidePdf,
  prodSlug,
}: {
  urlGuidePdf: string;
  prodSlug: string;
}) => {
  const handleDownload = () => saveAs(urlGuidePdf, `GUIA-${prodSlug}.pdf`);

  return (
    <>
      {urlGuidePdf ? (
        <button
          className="rounded-md border p-2 hover:bg-gray-100 flex flex-col items-center justify-center"
          onClick={handleDownload}
        >
          <span>Descargar Guía</span>
          <DownLoadIcon />
        </button>
      ) : (
        <button
          className="rounded-md border p-2 flex flex-col items-center justify-center"
          disabled
        >
          <span>Descargar Guía</span>
          <DownLoadIcon />
          <span className="text-xs">Aun No disponible</span>
        </button>
      )}
    </>
  );
};
