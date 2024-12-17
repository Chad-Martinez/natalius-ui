export type Register = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type Login = {
  email: string;
  password: string;
};

export type VerifyEmail = {
  token: string;
};

export type PasswordResetEmail = {
  email: string;
};

export type ResetPassword = {
  token: string;
  password: string;
};
