import { IAddress } from "@/interfaces"

type Props = {
    address: IAddress
}

export const SelectAddress = ({ address }: Props) => {
    // makeAddressPrimary

    const onSelectAddress = async () => { }

  return (
<button
    className="rounded border text-xs p-2 text-white bg-cerise-red-600 hover:bg-cerise-red-500"
    // onClick={() => onSelectAddress(address)}
  >
    seleccionar
  </button>
  )
}
