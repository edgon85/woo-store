import { IMeasurement } from '../interfaces/product';

export const measurementFormat = (
  category: string,
  measurement: IMeasurement
): string => {
  const { size, us, eu, uk, waist, long, gender, clothesType } = measurement;

  let measurementFormat = '';

  const sizeFormat = size === 'única' ? 'única' : size;
  const usValue = us === undefined ? '' : `/ ${us} us`;
  const euValue = eu === undefined ? '' : `/ ${eu} eu`;
  const ukValue = uk === undefined ? '' : `/ ${uk} uk`;

  const waistValue = waist === undefined ? '' : `/ ${waist} cm`;
  const longValue = waist === undefined ? '' : `/ ${long} cm`;

  if (gender === 'mujer' && clothesType === 'ropa') {
    measurementFormat = `${size} ${usValue} ${euValue}`;
  } else if (gender === 'mujer' && clothesType === 'zapatos') {
    measurementFormat = `${size} cm ${usValue} ${ukValue} ${euValue}`;
  } else if (gender === 'hombre' && clothesType === 'zapatos') {
    measurementFormat = `${size} cm ${usValue} ${ukValue} ${euValue}`;
  } else if (gender === 'hombre' && category === 'pantalones') {
    measurementFormat = `${size} ${waistValue} ${longValue}`;
  } else {
    measurementFormat = `${size}`;
  }

  return measurementFormat.toUpperCase();
};
