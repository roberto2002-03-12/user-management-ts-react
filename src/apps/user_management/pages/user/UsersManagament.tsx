import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useUserManagementApi } from '../../hooks/useUserManagementApi';
import { NavBar, UsersTable } from '../../components';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import '../../styles/UsersManagementStyle.css';
import { IStoreRedux } from '../../../../store';
import { IUserQuery } from '../../models/inputs.model';

// um: user management
export const UsersManagament = () => {
  const navigate = useNavigate();
  const { users, loadingState } = useSelector((state: IStoreRedux) => state.userManagement);
  const { getUsers } = useUserManagementApi();
  const [params, setParams] = useSearchParams();
  const [page, setPage] = useState(params.get('page') === null ? 1 : parseInt(params.get('page')!));

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitted },
    reset
  } = useForm<IUserQuery>();

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    const actualQuery = Object.fromEntries(params);
    setParams({ ...actualQuery, page: `${value}` });
  };

  const onSubmit: SubmitHandler<IUserQuery> = (data) => {
    if (Object.keys(errors).length > 0) return;

    const paramsObj: Record<string, string | string[]> = {};

    (Object.keys(data) as (keyof typeof data)[]).forEach(key => {
      if (typeof data[key] !== 'undefined' && data[key] !== '') {
        paramsObj[key] = String(data[key]);
      }
    });

    setParams({ ...paramsObj, page: `${page}` })
  }

  useEffect(() => {
    const paramsObject: unknown = Object.fromEntries(params);
    (paramsObject as IUserQuery).page = params.get('page') === null ? 1 : parseInt(params.get('page')!);
    getUsers(paramsObject as IUserQuery);
    console.log('hola desde users')
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
        <form onSubmit={ handleSubmit(onSubmit) }>
          <div className='um-filters'>
            <TextField
              {
              ...register('fullName', {
                required: false,
                maxLength: {
                  value: 65,
                  message: 'Max characteres 65'
                }
              })
              }
              error={ errors.fullName && isSubmitted }
              helperText={ errors.fullName && isSubmitted ? errors.fullName.message : '' }
              label='Filter by Full Name'
              variant='filled'
              size='small'
              InputLabelProps={{
                style: {
                  fontSize: '12px'
                }
              }}
              sx={{
                width: '180px'
              }}
            />

            <TextField
              {
                ...register('email', {
                  maxLength: {
                    value: 105,
                    message: 'Max characteres 105'
                  }
                })
              }
              error={ errors.email && isSubmitted }
              helperText={ errors.email && isSubmitted ? errors.email.message : '' }
              label='Filter by Email'
              variant='filled'
              size='small'
              InputLabelProps={{
                style: {
                  fontSize: '12px'
                }
              }}
              sx={{
                width: '180px'
              }}
            />

            <TextField
              {
              ...register('roleName', {
                maxLength: {
                  value: 45,
                  message: 'Max characteres 45'
                }
              })
              }
              error={ errors.roleName && isSubmitted }
              helperText={ errors.roleName && isSubmitted ? errors.roleName.message : '' }
              label='Filter by Role name'
              variant='filled'
              size='small'
              placeholder='super admin'
              InputLabelProps={{
                style: {
                  fontSize: '12px'
                }
              }}
              sx={{
                width: '180px'
              }}
            />

            <FormControl
              variant='filled'
              sx={{ width: '180px' }}
              size='small'
            >
              <InputLabel id="user-type-status" sx={{ fontSize: '12px' }}>Filter by active</InputLabel>
              <Select
                labelId="user-type-status"
                id="user-type-status"
                label="Filter by active"
                {
                ...register('active', {
                  required: false
                })
                }
                defaultValue={''}
              >
                <MenuItem value={'true'}>Active</MenuItem>
                <MenuItem value={'false'}>Disabled</MenuItem>
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
                      label='Register date (start)'
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
                        width: '180px'
                      }}
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
                      label='Register date (end)'
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
                        width: '180px'
                      }}
                    />
                  )
                }
              />
            </LocalizationProvider>
          </div>
          <div className="um-buttons">
            <Button
              variant='contained'
              size='small'
              type='submit'
            >
              Apply filters
            </Button>
            <Button
              variant='contained'
              size='small'
              onClick={() => reset()}
            >
              Reset filters
            </Button>
          </div>
        </form>

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
