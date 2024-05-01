import { useState, useEffect, useMemo, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useUserManagementApi } from '../../hooks/useUserManagementApi';
import { NavBar } from '../../components';
import { Loading, SmallLoading } from '../../../../shared';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import '../../styles/UserCreateStyle.css';
import { IStoreRedux } from '../../../../store';
import { IRoleForSelect } from '../../models';

export const EditUser = () => {
  const { user, loadingState, rolesForSelect, loadingRolesState } = useSelector((store: IStoreRedux) => store.userManagement);
  const navigate = useNavigate();
  const { id } = useParams();
  const { getOneUser, getRolesForSelect, assignNewRolesToUser } = useUserManagementApi();
  const [ rolesSelected, setRoleSelected ] = useState<IRoleForSelect[]>(typeof user.role !== 'undefined' && user.role.length > 0 ? user.role : []);
  const [filter, setFilter] = useState('');

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
  }
  
  const rolesFiltered = useMemo(() => {
    return rolesForSelect.filter(role => role.roleName.toLowerCase().includes(filter.toLowerCase()))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    getOneUser(parseInt(id!));
    getRolesForSelect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (typeof user.role !== 'undefined' && user.role.length > 0) {
      setRoleSelected(user.role);
    }
  }, [user.role]);

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const rolesToSend = rolesSelected;

    assignNewRolesToUser(rolesToSend, user.id);
  }

  return (
    <>
      <NavBar />
      <div className='container create-user-container'> {/* im not creating anything, im just using the same style as Create user to save code */}
        {
          loadingState === 'finished' ? (
            <form onSubmit={ onSubmitForm } className='horrible-form-which-destroy-everything'>
              <div className='create-user-options'>
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
                    Edit user
                  </Button>
              </div>
              <div className="row">
                <div className='col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 create-user-inputs'>
                  <div className='user-data-box'>
                    <h5>Email</h5>
                    <p>{ user.email }</p>
                  </div>
                  <div className='user-data-box'>
                    <h5>First Name</h5>
                    <p>{ user.profile && user.profile.firstName ? user.profile.firstName : 'not registed' }</p>
                  </div>
                  <div className='user-data-box'>
                    <h5>Last Name</h5>
                    <p>{ user.profile && user.profile.lastName ? user.profile.lastName : 'not registed' }</p>
                  </div>
                  <div className='user-data-box'>
                    <h5>Main role</h5>
                    <p>{ user.role === undefined ? 'not assigned' : user.role.length === 0 ? 'not assigned' : user.role[0].roleName }</p>
                  </div>
                  <div className='user-data-box'>
                    <h5>Birth</h5>
                    <p>{ user.profile && user.profile.lastName ? `${user.profile.birth}` : 'not registed' }</p>
                  </div>
                  <div className='user-data-box'>
                    <h5>Phone Number</h5>
                    <p>{ user.profile && user.profile.phoneNumber ? user.profile.phoneNumber : 'not registed' }</p>
                  </div>
                  <div className='user-data-box'>
                    <h5>Registed at</h5>
                    <p>{ `${user.created_at}` }</p>
                  </div>
                  <div className='user-data-box'>
                    <h5>Updated at</h5>
                    <p>{ `${user.created_at}` }</p>
                  </div>
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
                      loadingRolesState === 'loading' ?
                      <SmallLoading /> : (
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
          ) : <Loading />
        }
      </div>
    </>
  )
}
