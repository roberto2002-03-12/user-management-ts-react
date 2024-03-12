import { TypeLoadingState } from '../'
import { ICat } from '../../apps/user_management/models';

export interface CatSlice {
  loadingState: TypeLoadingState;
  cat: ICat;
  cats: {
    count: number;
    page: number;
    data: ICat[]
  }
}