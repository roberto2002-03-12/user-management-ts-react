import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useUserManagementApi } from '../../hooks/useUserManagementApi';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination'
import { NavBar, RolesTable } from '../../components';
import { Filter } from './components/Filter'
import '../../styles/RolesManagementStyle.css';
import { IRoleQuery } from '../../models';
import { IStoreRedux } from '../../../../store';

export const RolesManagement = () => {
  const { roles, loadingState } = useSelector((state: IStoreRedux) => state.userManagement);
  const { getRoles } = useUserManagementApi();
  const [ params, setParams ] = useSearchParams();
  const [ page, setPage ] = useState(params.get('page') === null ? 1 : parseInt(params.get('page')!))

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    const actualQuery = Object.fromEntries(params);
    setParams({ ...actualQuery, page: `${value}` });
  };
  
  useEffect(() => {
    const paramsObject: unknown = Object.fromEntries(params);
    (paramsObject as IRoleQuery).page = params.get('page') === null ? 1 : parseInt(params.get('page')!);
    getRoles(paramsObject as IRoleQuery);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <>
      <NavBar />
      <div className="role-container">
        <div className="role-title-filters">
          <h5>Roles filter</h5>
          <Button variant='outlined' size='small'>
            <Link 
              to={'/user-management/roles/create'} 
              style={{ textDecoration: 'none' }}
            >
              Create role
            </Link>
          </Button>
        </div>
        {/* <RolesFilter /> */}
        <Filter setParams={ setParams } page={ page }/>

        <RolesTable 
          roles={roles.data}
          loadingState={ loadingState }
        />

        <Pagination 
          count={ Math.ceil(roles.count / 20) }
          page={ page }
          onChange={ handlePageChange }
        />
      </div>
    </>
  )
}
