import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useAuthApi } from '../hook/useAuthApi';
import { NavBar } from '../../user_management/components';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Loading } from '../../../shared';
import '../styles/UserProfileStyle.css';
import { IStoreRedux } from '../../../store';
import { IUserProfileInputs, IUserChangePasswordInputs } from '../model'
import dayjs from 'dayjs';

type UserContentSelectType = 'info' | 'edit-profile' | 'change-password';

export const UserProfile = () => {
  const { user, profileState } = useSelector((state: IStoreRedux) => state.auth);
  const { updateProfile, changePassword } = useAuthApi();
  const [contentSelect, setContentSelect] = useState<UserContentSelectType>('info');

  const handleChangeContent = (arg: UserContentSelectType): void => {
    setContentSelect(arg);
  };

  const {
    register: registerProfile,
    formState: { errors: errorsProfile, isSubmitted: isSubmitedProfile },
    handleSubmit: handleSubmitProfile,
    control: controlProfile
  } = useForm<IUserProfileInputs>({
    defaultValues: {
      firstName: user.profile ? user.profile.firstName ?? 'not registed' : 'not registed',
      lastName: user.profile ? user.profile.lastName ?? 'not registed' : 'not registed',
      phoneNumber: user.profile ? user.profile.phoneNumber ?? 'not registed' : 'not registed',
      birth: user.profile ?  dayjs(user.profile.birth ?? '') : null
    }
  });

  const {
    register: registerPassword,
    formState: { errors: errorsPassword, isSubmitted: isSubmittedPassword },
    handleSubmit: handleSubmitPassword,
    reset: resetPassword, 
    setError: setErrorPassword
  } = useForm<IUserChangePasswordInputs>({
    defaultValues: {
      newPassword: '',
      repeatPassowrd: ''
    }
  })

  const onSubmitProfile: SubmitHandler<IUserProfileInputs> = (data) => {
    if (Object.keys(errorsProfile).length > 0) return;
    updateProfile(data);
  }

  const onSubmitPassword: SubmitHandler<IUserChangePasswordInputs> = (data) => {
    if (Object.keys(errorsPassword).length > 0) return;

    if (data.newPassword !== data.repeatPassowrd) {
      setErrorPassword('repeatPassowrd', {
        message: 'Password must be equal'
      });

      return;
    }

    changePassword(data);
    resetPassword();
  }

  return (
    <>
      <NavBar />
      {
        profileState === 'loading' ?
        <Loading /> :
      (
      <div className='user-prifle'>
        <div className='user-profile-side'>
          <div className='user-profile-img'>
            <img src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png" alt="user profile"/>
          </div>
          <p className='user-profile-img-p'>{ typeof user.profile !== 'undefined' ? `${user.profile.firstName} ${user.profile.lastName}` : 'not registed' }</p>
          <div className='user-profile-side-buttons'>
            <Button variant='outlined' size='small' sx={{ marginBottom: '10px', width: '170px' }} onClick={ () => handleChangeContent('info') }>Info</Button>
            <Button variant='outlined' size='small' sx={{ marginBottom: '10px', width: '170px' }} onClick={ () => handleChangeContent('edit-profile') }>Edit profile</Button>
            <Button variant='outlined' size='small' sx={{ marginBottom: '10px', width: '170px' }} onClick={ () => handleChangeContent('change-password') }>Change password</Button>
          </div>
        </div>
        <div className='user-profile-content'>
          {
            contentSelect === 'info' ? 
            (
              <div className='user-profile-info row'>
                <h5>User info</h5>
                <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12'>
                  <p className='user-profile-content-label'>First Name</p>
                  <p className='user-profile-content-p'>{typeof user.profile !== 'undefined' ? user.profile.firstName : 'not registed'}</p>
                </div>

                <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12'>
                  <p className='user-profile-content-label'>Last Name</p>
                  <p className='user-profile-content-p'>{typeof user.profile !== 'undefined' ? user.profile.lastName : 'not registed'}</p>
                </div>

                <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12'>
                  <p className='user-profile-content-label'>Email</p>
                  <p className='user-profile-content-p'>{ user.email }</p>
                </div>

                <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12'>
                  <p className='user-profile-content-label'>Main Role</p>
                  <p className='user-profile-content-p'>{typeof user.role !== 'undefined' && user.role.length > 0 ? user.role[0].roleName : 'not assigned'}</p>
                </div>

                <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12'>
                  <p className='user-profile-content-label'>Birth Date</p>
                  <p className='user-profile-content-p'>{typeof user.profile !== 'undefined' ? `${user.profile.birth}` : 'not registed'}</p>
                </div>

                <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12'>
                  <p className='user-profile-content-label'>Registed Date</p>
                  <p className='user-profile-content-p'>{ `${user.created_at}` }</p>
                </div>

                <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12'>
                  <p className='user-profile-content-label'>Updated Date</p>
                  <p className='user-profile-content-p'>{ `${user.updated_at}` }</p>
                </div>
              </div>
            ) : contentSelect === 'edit-profile' ?
            (
              <form onSubmit={ handleSubmitProfile(onSubmitProfile) }>
                <div className='user-profile-edit row'>
                  <h5>Edit Profile</h5>
                  <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12 d-flex justify-content-center'>
                    <TextField
                      variant='outlined'
                      size='small'
                      label='First Name'
                      {
                        ...registerProfile('firstName', {
                          required: false,
                          minLength: {
                            value: 3,
                            message: 'Min characteres 3'
                          },
                          maxLength: {
                            value: 65,
                            message: 'Max characteres 65'
                          }
                        })
                      }
                      // defaultValue={ `${user.profile?.firstName}` }
                      error={ errorsProfile.firstName && isSubmitedProfile }
                      helperText={ errorsProfile.firstName && isSubmitedProfile ? errorsProfile.firstName.message : '' }
                      sx={{ marginBottom: '20px' }}
                    />
                  </div>

                  <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12 d-flex justify-content-center'>
                    <TextField
                      variant='outlined'
                      size='small'
                      label='Last Name'
                      {
                        ...registerProfile('lastName', {
                          required: false,
                          minLength: {
                            value: 3,
                            message: 'Min characteres 3'
                          },
                          maxLength: {
                            value: 65,
                            message: 'Max characteres 65'
                          }
                        })
                      }
                      // defaultValue={ `${user.profile?.lastName}` }
                      error={ errorsProfile.lastName && isSubmitedProfile }
                      helperText={ errorsProfile.lastName && isSubmitedProfile ? errorsProfile.lastName.message : '' }
                      sx={{ marginBottom: '20px' }}
                    />
                  </div>

                  <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12 d-flex justify-content-center'>
                    <TextField
                      variant='outlined'
                      size='small'
                      label='Phone number'
                      {
                        ...registerProfile('phoneNumber', {
                          required: false,
                          maxLength: {
                            value: 25,
                            message: 'Max characteres 65'
                          },
                          pattern: {
                            value: /^[0-9() +-]*$/,
                            message: 'Only numbers and "() + -" are allowed'
                          }
                        })
                      }
                      // defaultValue={ `${user.profile?.lastName}` }
                      error={ errorsProfile.phoneNumber && isSubmitedProfile }
                      helperText={ errorsProfile.phoneNumber && isSubmitedProfile ? errorsProfile.phoneNumber.message : '' }
                      sx={{ marginBottom: '20px' }}
                    />
                  </div>

                  <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12 d-flex justify-content-center'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Controller 
                        name='birth'
                        control={ controlProfile }
                        // defaultValue={ user.profile ?  dayjs(user.profile.birth) : null }
                        render={
                          ({ field }) => (
                            <DatePicker
                              {...field}
                              label='Birth Date'
                              slotProps={{
                                textField: {
                                  variant: 'outlined',
                                  size: 'small',
                                }
                              }}
                              sx={{
                                width: '225px',
                              }}
                            />
                          )
                        }
                      />
                    </LocalizationProvider>
                  </div>
                  <Button
                    variant='contained'
                    type='submit'
                    size='small'
                    sx={{ 
                      width: '100px', 
                      margin: 'auto', 
                      marginBottom: '20px' 
                    }}
                  >
                    Update
                  </Button>
                </div>
              </form>
            ) : 
            (
              <form onSubmit={ handleSubmitPassword(onSubmitPassword) }>
                <div className="user-profile-password row">
                  <h5>Change password</h5>
                  <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12 d-flex justify-content-center'>
                    <TextField
                      variant='outlined'
                      type='password'
                      placeholder='********'
                      size='small'
                      label='Password'
                      id='newPassword'
                      {
                        ...registerPassword('newPassword', {
                          required: true,
                          minLength: {
                            value: 8,
                            message: 'Password must have at least 8 characteres'
                          },
                          maxLength: {
                            value: 255,
                            message: 'Password too long, max characteres: 255'
                          }
                        })
                      }
                      defaultValue={''}
                      error={ errorsPassword.newPassword && isSubmittedPassword }
                      helperText={ errorsPassword.newPassword && isSubmittedPassword ? errorsPassword.newPassword.message : '' }
                      sx={{ marginBottom: '20px' }}
                    />
                  </div>

                  <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12 d-flex justify-content-center'>
                    <TextField
                      variant='outlined'
                      type='password'
                      placeholder='********'
                      size='small'
                      label='Confirm password'
                      id='repeatPassword'
                      {
                        ...registerPassword('repeatPassowrd', {
                          required: true,
                          minLength: {
                            value: 8,
                            message: 'Password must have at least 8 characteres'
                          },
                          maxLength: {
                            value: 255,
                            message: 'Password too long, max characteres: 255'
                          }
                        })
                      }
                      defaultValue={''}
                      error={ errorsPassword.repeatPassowrd && isSubmittedPassword }
                      helperText={ errorsPassword.repeatPassowrd && isSubmittedPassword ? errorsPassword.repeatPassowrd.message : '' }
                      sx={{ marginBottom: '20px' }}
                    />
                  </div>
                  <Button
                    variant='contained'
                    type='submit'
                    size='small'
                    sx={{ 
                      width: '100px', 
                      margin: 'auto', 
                      marginBottom: '20px' 
                    }}
                  >
                    Update
                  </Button>
                </div>
              </form>
            )
          }
        </div>
      </div>
      )
      }
    </>
  )
}
