import { Control, ControllerProps } from 'react-hook-form';
import { TypeOrder } from '../../../models'
import { IAction } from './'

export interface TextFieldInputHookForm {
  name: string;
  control: Control;
  label: string;
  defaultValue?: string;
  rules?: ControllerProps['rules'];
}

export interface IUserInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birth: Date | null;
  phoneNumber: number | string;
}

export interface IRoleInputs {
  roleName: string;
  description?: string;
  action?: IAction[];
}

export interface IRoleInputsEdit {
  roleName?: string;
  description?: string;
  action?: IAction[];
}

export interface IUserQuery {
  order?: TypeOrder;
  email?: string;
  fullName?: string;
  roleName?: string;
  active?: string;
  createdAtStart?: string | null;
  createdAtEnd?: string | null;
  limit?: number;
  page: number;
}

export interface IRoleQuery {
  order?: TypeOrder;
  roleName?: string;
  active?: string;
  routeId?: number; 
  createdAtStart?: string | null;
  createdAtEnd?: string | null;
  limit?: number;
  page: number;
}