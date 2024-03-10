import { Dayjs } from 'dayjs';
import { IRole } from '../../user_management/models/privileges.model';

export interface IProfile {
  id: number;
  firstName: string;
  lastName: string;
  birth: Date | Dayjs | string;
  phoneNumber: string;
  userId: number;
}

export interface IUser {
  id: number;
  email: string;

  active: boolean;

  created_by: number;
  created_at: Date;
  updated_by: number;
  updated_at: Date;

  profile?: IProfile;
  role?: IRole[];
  routes?: string[];
}

export interface IUserLoginInputs {
  email: string;
  password: string;
}

export interface IRecoveryInputs {
  email: string;
}

export interface IRecoveryChangePasswordInputs {
  recoveryToken: string;
  newPassword: string;
  repeatPassword?: string;
}

export interface IUserProfileInputs {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birth: string | Date | Dayjs | null;
}

export interface IUserChangePasswordInputs {
  newPassword: string;
  repeatPassowrd?: string;
}