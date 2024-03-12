import userManagementApi from '../../../api/user-management.api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useErrorHandler } from '../../../hooks'
import Swal from 'sweetalert2';
import {
  onLoadDataCat, onLoadedCats, onChangeLoadStateCat
} from '../../../store';

import { ICat, ICatFiltersInputs } from '../models';
import { AxiosError } from 'axios';

export const useCatApi = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorManage = useErrorHandler();

  const getCats = async (dataInputs: ICatFiltersInputs) => {
    dispatch(onLoadDataCat());
    try {
      const url = `/cat/?limit=6&page=` +
      + (dataInputs !== undefined && dataInputs.page !== undefined ? `${dataInputs.page}` : '1')
      + (dataInputs !== undefined && dataInputs.name !== undefined && dataInputs.name !== '' ? `&name=${dataInputs.name}` : '')
      + (dataInputs !== undefined && dataInputs.race !== undefined && dataInputs.race !== '' ? `&race=${dataInputs.race}` : '')
      + (dataInputs !== undefined && dataInputs.minimumPrice !== undefined && dataInputs.minimumPrice !== '' ? `&minimumPrice=${dataInputs.minimumPrice}` : '')
      + (dataInputs !== undefined && dataInputs.highestPrice !== undefined && dataInputs.highestPrice !== '' ? `&highestPrice=${dataInputs.highestPrice}` : '')

      const { data } = await userManagementApi.get(url);
      dispatch(onLoadedCats(data));
      return data as { page: number, count: number, data: ICat[] };
    } catch (error) {
      if (error instanceof AxiosError) {
        errorManage(error, {
          navigateError403: '/user-management/home',
          navigateError404: '/user-management/home'
        });
      }
      console.log(error);
    }
  }

  const createCats = async (catInputs: ICat) => {
    dispatch(onLoadDataCat());
    try {
      await userManagementApi.post('/cat', catInputs);
      dispatch(onChangeLoadStateCat());
      Swal.fire({
        icon: 'success',
        title: 'New cat added'
      });
      navigate('/user-management/cat');
    } catch (error) {
      if (error instanceof AxiosError) {
        errorManage(error, {
          navigateError403: '/user-management/home',
          navigateError404: '/user-management/home'
        })
      }
      console.log(error) 
    }
  }

  return {
    getCats,
    createCats
  }
};