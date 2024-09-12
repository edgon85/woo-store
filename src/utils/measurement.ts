import { IMeasurement } from '@/interfaces';

export const formatMeasurementString = (
  measurement: IMeasurement,
  category: string
): string => {
  if (!measurement) return '';

  const { eu, long, size, uk, us, waist, clothesType, gender, slug } =
    measurement;
  let parts: string[] = [];

  if (size === 'unica' || size === 'única') {
    return 'Única';
  }

  if (clothesType === 'zapatos') {
    parts.push(`${size}`);
    parts.push(`${us} US`);
    parts.push(`${eu} EU`);
    if (gender === 'hombre') {
      parts.push(`${uk} UK`);
    }
    return parts.join(' / ');
  }

  if (clothesType === 'ropa') {
    if (
      gender === 'hombre' &&
      !isNaN(Number(size)) &&
      !slug.includes('pantalon')
    ) {
      parts.push(`${size} cm`);
    } else {
      parts.push(size);
    }
    /* if (us !== 0) parts.push(`${us} US`);
    if (eu !== 0) parts.push(`${eu} EU`); */
    if (us !== 0) parts.push(`${us} US`);
    if (eu !== 0) parts.push(`${eu} EU`);
    return parts.join(' / ');
  }

  if (gender === 'hombre' && slug.includes('pantalon')) {
    return size;
  }

  if (category === 'pantalones' && waist && long) {
    parts.push(`${waist} cm`, `${long} cm`);
  }

  return parts.join(' / ');
};
