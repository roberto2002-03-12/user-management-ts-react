import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUserManagementApi } from '../../hooks/useUserManagementApi'
import { NavBar } from '../../components';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import '../../styles/UserCreateStyle.css';
import { IRoleForSelect, IUserInputs } from '../../models';
import { IStoreRedux } from '../../../../store'
import { SmallLoading } from '../../../../shared';

export const CreateUser = () => {
  const { getRolesForSelect, createUser } = useUserManagementApi();
  const { rolesForSelect, loadingRolesState } = useSelector((state: IStoreRedux) => state.userManagement);
  const [ rolesSelected, setRoleSelected ] = useState<IRoleForSelect[]>([]);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset, 
    control
  } = useForm<IUserInputs>();

  const onSubmit: SubmitHandler<IUserInputs> = (data) => {
    if (Object.keys(errors).length > 0) return;

    if (rolesSelected.length > 0) {
      const actual = rolesSelected;
      createUser(data, actual);
    } else {
      createUser(data);
    }
    reset();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCheckBoxChange = (idRole: number, roleName: string) => (_event: React.ChangeEvent<HTMLInputElement>) => {
    setRoleSelected((prev: IRoleForSelect[]) => {
      const selectedRole = prev.find(r => r.id === idRole);

      if (selectedRole) return prev.filter(r => r.id !== selectedRole.id)
      else {
        return [
          ...prev,
          {
            id: idRole,
            roleName
          }
        ]
      }
    });
  };

  useEffect(() => {
    getRolesForSelect();
  }, [])

  const rolesFiltered = useMemo(() => {
    return rolesForSelect.filter(role => role.roleName.toLowerCase().includes(filter.toLocaleLowerCase()) )
  }, [filter]);

  return (
    <>
      <NavBar />
      <div className="container create-user-container">
        <form onSubmit={ handleSubmit(onSubmit) } className='horrible-form-which-destroy-everything'>
          <div className="create-user-options">
            <span>
              <Button
                variant='text'
                size='small'
                sx={{ color: 'gray' }}
                onClick={() => navigate(-1)}
              >
                <ArrowBackIcon />
              </Button>
              Go back
            </span>
            <Button
              type='submit'
              variant='outlined'
              size='small'
            >
              Create user
            </Button>
          </div>
          <div className="row">
            <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 create-user-inputs">
              <TextField
                error={ errors.email && isSubmitted }
                helperText={ errors.email && isSubmitted ? errors.email.message : '' }
                {
                  ...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Invalid email'
                    },
                    maxLength: {
                      value: 105,
                      message: 'Max characteres 105'
                    }
                  })
                }
                variant='outlined'
                size='small'
                sx={{
                  width: '180px',
                  margin: '20px'
                }}
                label='Email'
                placeholder='example@gmail.com'
              />

              <TextField
                error={ errors.password && isSubmitted }
                helperText={ errors.password && isSubmitted ? errors.password.message : '' }
                {
                  ...register('password', {
                    required: 'password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must have 8 characteres long'
                    }
                  })
                }
                variant='outlined'
                size='small'
                sx={{
                  width: '180px',
                  margin: '20px'
                }}
                label='Password'
                placeholder='********'
                type='password'
              />

              <TextField
                error={ errors.firstName && isSubmitted }
                helperText={ errors.firstName && isSubmitted ? errors.firstName.message : '' }
                {
                  ...register('firstName', {
                    required: 'First name is required',
                    minLength: {
                      value: 3,
                      message: 'First name must have at least 8 characteres long'
                    },
                    maxLength: {
                      value: 65,
                      message: 'Max characteres 65'
                    }
                  })
                }
                variant='outlined'
                size='small'
                sx={{
                  width: '180px',
                  margin: '20px'
                }}
                label='First Name'
                placeholder='Roberto'
              />

              <TextField 
                error={ errors.lastName && isSubmitted }
                helperText={ errors.lastName && isSubmitted ? errors.lastName.message : '' }
                {
                  ...register('lastName', {
                    required: 'Last name is required',
                    minLength: {
                      value: 3,
                      message: 'Last name must have at least 8 characteres long'
                    },
                    maxLength: {
                      value: 65,
                      message: 'Max characteres 65'
                    }
                  })
                }
                variant='outlined'
                size='small'
                sx={{
                  width: '180px',
                  margin: '20px'
                }}
                label='Last Name'
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name='birth'
                  control={ control }
                  render={
                    ({ field }) => (
                      <DatePicker
                        {...field}
                        label='Birth'
                        slotProps={{
                          textField: {
                            variant: 'outlined',
                            size: 'small',
                            error: errors.birth && isSubmitted,
                            helperText: errors.birth && isSubmitted ? errors.birth.message : ''
                          }
                        }}
                        sx={{
                          width: '180px',
                          margin: '20px'
                        }}
                      />
                    )
                  }
                  rules={{
                    required: 'Birth is required'
                  }}
                />
              </LocalizationProvider>

              <TextField
                error={ errors.phoneNumber && isSubmitted }
                helperText={ errors.phoneNumber && isSubmitted ? errors.phoneNumber.message : '' }
                {
                  ...register('phoneNumber', {
                    required: 'Phone number is required',
                    maxLength: {
                      value: 25,
                      message: 'Max characteres 25'
                    },
                    pattern: {
                      value: /^[0-9() +-]*$/,
                      message: 'Only numbers and "() + -" are allowed'
                    }
                  })
                }
                variant='outlined'
                size='small'
                sx={{
                  width: '180px',
                  margin: '20px'
                }}
                label='Phone number'
                placeholder='+51 965368241'
              />
            </div>
            <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 create-user-roles-aside">
              <TextField 
                variant='outlined'
                label='Search by name'
                name='roleNameFilter'
                sx={{ marginBottom: '10px' }}
                size='small'
                value={filter}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFilter(event.target.value)}
              />
              <div className="create-user-roles-aside-list">
                {
                  loadingRolesState === 'loading' 
                  ? <SmallLoading /> 
                  : (
                    <List>
                      {
                        (filter === '' ? rolesForSelect : rolesFiltered).map((row) => (
                          <ListItem
                            key={row.id}
                            disablePadding
                          >
                            <ListItemButton>
                              <ListItemIcon>
                                <Checkbox 
                                  checked={ rolesSelected.some(r => r.id === row.id) }
                                  edge='start'
                                  inputProps={{ 'aria-labelledby': `checkbox-list-label-${row.id}` }}
                                  onChange={ handleCheckBoxChange(row.id, row.roleName) }
                                />
                              </ListItemIcon>
                              <ListItemText id={`checkbox-list-label-${row.id}`} primary={ row.roleName } />
                            </ListItemButton>
                          </ListItem>
                        ))
                      }
                    </List>
                  )
                }
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
