export type RegistrationType = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

export type LoginType = {
  identifier: string;
  password: string;
};

export type LoginResponse = {
  jwt: string;
  user: UserType;
};

export type PasswordType = {
  password: string;
  passwordConfirmation: string;
};

export type ForgotPassType = { email: string };

export type ResetPassType = PasswordType & { code: string };

export type PassInputsType = PasswordType & { email: string };

export type UserType = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: false;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  phone: string;
};
