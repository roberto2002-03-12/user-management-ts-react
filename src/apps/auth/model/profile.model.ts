import { Dayjs } from 'dayjs';

export interface IProfile {
  id: number;
  firstName: string;
  lastName: string;
  birth: Date | Dayjs | string;
  phoneNumber: string;
  userId: number;
}
