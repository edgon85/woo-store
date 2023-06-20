export const isValidEmail = (email: string): boolean => {
  const match = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  return !!match;
};

export const isEmail = (email: string): string | undefined => {
  return isValidEmail(email) ? undefined : 'El correo no parece ser válido';
};

export const isValidPassword = (password: string): boolean => {
  const match = String(password).match(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
  );

  return !!match;
};

export const isPassword = (password: string): string | undefined => {
  return isValidPassword(password)
    ? undefined
    : 'La contraseña debe tener una letra mayúscula, una minúscula y un número';
};
