export const InitialsProfile = (name: string): string => {
  return name
    .split(' ')
    .map((palabra) => palabra.charAt(0))
    .join('')
    .toUpperCase();
};
