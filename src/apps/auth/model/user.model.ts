import { Dayjs } from 'dayjs';
import { IRole } from '../../user_management/models/privileges.model';
import { IProfile } from './'

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

export interface IUserRegisterInputs extends IUserLoginInputs {
  firstName: string;
  lastName: string;
  birth: string | Date | Dayjs | null;
  phoneNumber: string;
}