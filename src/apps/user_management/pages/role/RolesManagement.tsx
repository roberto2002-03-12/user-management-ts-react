import { useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useUserManagementApi } from '../../hooks/useUserManagementApi';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { NavBar, RolesTable } from '../../components';
import '../../styles/RolesManagementStyle.css';
import { IRoleQuery } from '../../models';
import { IStoreRedux } from '../../../../store';

const defaultValues: IRoleQuery = {
  active: '',
  createdAtStart: null,
  createdAtEnd: null,
  page: 0,
  roleName: ''
};

export const RolesManagement = () => {
  const { roles, loadingState } = useSelector((state: IStoreRedux) => state.userManagement);
  const { getRoles } = useUserManagementApi();
  const [ params, setParams ] = useSearchParams();
  const [ page, setPage ] = useState(params.get('page') === null ? 1 : parseInt(params.get('page')!))

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    // there is a bug, for a reason params sets back to {} and all the data is lost
    // to prevent this i create an object to get the actual queries and then add the page
    const actualQuery = Object.fromEntries(params);
    setParams({ ...actualQuery, page: `${value}` });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<IRoleQuery>({defaultValues});

  const onSubmit: SubmitHandler<IRoleQuery> = (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    const paramsObj: Record<string, string | string[]> = {};

    (Object.keys(data) as (keyof typeof data)[]).forEach(key => {
      if (typeof data[key] !== 'undefined' && data[key] !== '' && data[key] !== null && data[key]) {
        paramsObj[key] = String(data[key]);
      }
    });

    setParams({...paramsObj, page: `${page}`});
    // data.page = page;
    // getRoles(data);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='role-filters'>
            <TextField
              variant='filled'
              {
                ...register('roleName', {
                  required: false,
                })
              }
              sx={{ 
                width: '180px',
                marginLeft: '15px',
                marginRight: '15px' 
              }}
              InputLabelProps={{
                style: {
                  fontSize: '12px'
                }
              }}
              size='small'
              label='Role name'
              placeholder='admin'
            />

            <FormControl 
              variant='filled' 
              sx={{ 
                width: '180px',
                marginLeft: '15px',
                marginRight: '15px'  
              }} 
              size='small'
            >
              <InputLabel id="role-type" sx={{ fontSize: '12px' }}>Role state</InputLabel>
              <Select
                labelId="role-type"
                id="role-type"
                label="Role state"
                {
                  ...register('active', {
                    required: false
                  })
                }
                defaultValue={''}
              >
                <MenuItem value={'true'}>Active</MenuItem>
                <MenuItem value={'false'}>Unable</MenuItem>
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              
              <Controller 
                name='createdAtStart'
                control={control}
                render={
                  ({ field }) => (
                    <DatePicker
                      {...field}
                      label='register date (start)'
                      slotProps={{
                        textField: {
                          variant: 'filled',
                          size: 'small',
                          InputLabelProps: {
                            style: {
                              fontSize: '12px'
                            }
                          }
                        }
                      }}
                      sx={{
                        width: '180px',
                        marginLeft: '15px',
                        marginRight: '15px'
                      }}
                      onChange={(date) => field.onChange(date)}
                      value={field.value ? new Date(field.value) : null} 
                    />
                  )
                }
              />

              <Controller
                name='createdAtEnd'
                control={control} 
                render={
                  ({field}) => (
                    <DatePicker
                      {...field}
                      label='register date (end)'
                      slotProps={{
                        textField: {
                          variant: 'filled',
                          size: 'small',
                          InputLabelProps: {
                            style: {
                              fontSize: '12px'
                            }
                          }
                        }
                      }}
                      sx={{
                        width: '180px',
                        marginLeft: '15px',
                        marginRight: '15px'
                      }}
                      onChange={(date) => field.onChange(date)}
                      value={field.value ? new Date(field.value) : null} 
                    />
                  )
                }
              />

              
            </LocalizationProvider>
          </div>
          <div className="role-filters-button">
            <Button
              type='submit'
              variant='contained'
              size='small'
              sx={{
                width: '150px'
              }}
            >
              Apply filters
            </Button>
            <Button
              onClick={() => reset({ roleName: '', active: 'true', createdAtEnd: undefined, createdAtStart: undefined })}
              variant='contained'
              size='small'
              sx={{
                width: '150px'
              }}
            >
              Delete filters
            </Button>
          </div>
        </form>
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
