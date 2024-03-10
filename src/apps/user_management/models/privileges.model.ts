export interface IRole {
  id: number;
  roleName: string;
  description?: string;
  active: boolean;
  
  created_by: number;
  created_at: Date;
  updated_by: number;
  updated_at: Date;
  route: IRoute[];
  action?: IAction[];
}

export interface IRoleForSelect {
  id: number;
  roleName: string;
}

export interface IAction {
  id: number;
  actionName: string;
}

export interface IRoute {
  id: number;
  url: string;
  description?: string;
  action: IAction[];
}