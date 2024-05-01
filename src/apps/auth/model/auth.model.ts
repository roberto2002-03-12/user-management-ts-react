export interface IRecoveryInputs {
  email: string;
}

export interface IRecoveryChangePasswordInputs {
  recoveryToken: string;
  newPassword: string;
  repeatPassword?: string;
}

export type TypeAuthPage = 'login' | 'register' | 'recovery' | 'change-password'