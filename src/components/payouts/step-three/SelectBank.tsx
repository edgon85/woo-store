import { usePayoutStore } from '@/stores';

//TODO: traer bancos de la api

const bankList = [
  { id: 'azteca', name: 'azteca' },
  { id: 'bac', name: 'bac' },
  { id: 'bam', name: 'bam' },
  { id: 'banrural', name: 'banrural' },
  { id: 'bantrab', name: 'bantrab' },
  { id: 'g-y-t-continental', name: 'g&t continental' },
  { id: 'industrial', name: 'industrial' },
];

export const SelectBank = () => {
  const onSetBank = usePayoutStore((store) => store.setBank);
  const bank = usePayoutStore((store) => store.bank);

  return (
    <div>
      <div>
        <h2 className="text-lg font-bold">Seleccione banco</h2>

        <form className="mt-4">
          <select
            value={bank}
            className="border rounded p-4 w-full capitalize"
            onChange={(e) => onSetBank(e.target.value)}
          >
            <option value="">-- Seleccione un banco --</option>
            {bankList.map((bank) => (
              <option key={bank.id} value={bank.id} className="capitalize">
                {bank.name}
              </option>
            ))}
          </select>
        </form>
      </div>
    </div>
  );
};
