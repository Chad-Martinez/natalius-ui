export type Register = {
  stageName: string;
  email: string;
  password: string;
};

export type Login = {
  email: string;
  password: string;
};

export type VerifyEmail = string;

export type PasswordResetEmail = {
  email: string;
};

export type ResetPassword = {
  token: string;
  password: string;
};
