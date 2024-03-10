import { IUser } from '../../apps/auth/model'
import { ISideBarOptions } from '../../models';

type TypeAuthState = 'authenticated' | 'checking' | 'not-authenticated' | 'recovery' | 'sent' | 'not-sent';

export interface AuthSlice {
  authState: TypeAuthState,
  user: IUser;
  authMessage: string;
  options: ISideBarOptions[]
}