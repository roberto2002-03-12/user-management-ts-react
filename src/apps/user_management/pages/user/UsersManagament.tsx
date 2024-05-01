import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUserManagementApi } from '../../hooks/useUserManagementApi';
import { NavBar, UsersTable } from '../../components';
import { Filters } from './components'
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import '../../styles/UsersManagementStyle.css';
import { IStoreRedux } from '../../../../store';
import { IUserQuery } from '../../models/inputs.model';

export const UsersManagament = () => {
  const navigate = useNavigate();
  const { users, loadingState } = useSelector((state: IStoreRedux) => state.userManagement);
  const { getUsers } = useUserManagementApi();
  const [ params, setParams ] = useSearchParams();
  const [ page, setPage ] = useState(params.get('page') === null ? 1 : parseInt(params.get('page')!));

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    const actualQuery = Object.fromEntries(params);
    setParams({ ...actualQuery, page: `${value}` });
  };

  useEffect(() => {
    const paramsObject: unknown = Object.fromEntries(params);
    (paramsObject as IUserQuery).page = params.get('page') === null ? 1 : parseInt(params.get('page')!);
    getUsers(paramsObject as IUserQuery);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <>
      <NavBar />
      <div className='um-container'>
        <div className='um-title-filters'>
          <h5>Users filters</h5>
          <Button
            onClick={() => navigate('/user-management/users/create')}
            variant='outlined'
            size='small'
          >
            Create user
          </Button>
        </div>
        
        <Filters setParams={ setParams } page={ page }/>

        <UsersTable users={users.data} loadingState={loadingState} />
        <Pagination
          count={Math.ceil(users.count / 20)}
          page={page}
          onChange={handlePageChange}
          sx={{
            marginBottom: '50px'
          }}
        />
      </div>
    </>
  )
}
