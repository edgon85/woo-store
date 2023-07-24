import { IClotesSize } from '../interfaces/product';

export const measurementFormat = (
  gender: string,
  category: string,
  talla: IClotesSize
): string => {
  const { id, size, us, eu, uk, waist, long } = talla;

  let measurementFormat = '';

  const usValue = us === undefined ? '' : `/ ${us} us`;
  const euValue = eu === undefined ? '' : `/ ${eu} eu`;

  const waistValue = waist === undefined ? '' : `/ ${waist} cm`;
  const longValue = waist === undefined ? '' : `/ ${long} cm`;

  if (category === 'pantalones' && gender === 'hombre') {
    measurementFormat = `${size} ${waistValue} ${longValue}`;
  } else {
    measurementFormat = `${size} ${usValue} ${euValue}`;
  }

  return measurementFormat;
};
