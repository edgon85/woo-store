export const uuIiMyFormat = (uuId: string) => {
    const partes = uuId.split('-');
    const ultimaParte = partes[partes.length - 1];
  
    return ultimaParte;
  };
  