import { useState } from 'react';
import { NavBar } from '../../components';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import '../../styles/UserProfileStyle.css';

type UserContentSelectType = 'info' | 'edit-profile' | 'change-password';

export const UserProfile = () => {
  const [contentSelect, setContentSelect] = useState<UserContentSelectType>('info');

  const handleChangeContent = (arg: UserContentSelectType): void => {
    setContentSelect(arg);
  }

  return (
    <>
      <NavBar />
      <div className='user-prifle'>
        <div className='user-profile-side'>
          <div className='user-profile-img'>
            <img src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png" alt="user profile"/>
          </div>
          <p className='user-profile-img-p'>Emilio Roberto Fabriciano Contreras Gonzales</p>
          {/* Acá debo revisar si el id de la url coincide con el id que se guarda en memoria local
              si coincide entonces mostrar estos botones, caso contrario no mostrarlo */}
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
                  <p className='user-profile-content-p'>Emilio Roberto Fabriciano</p>
                </div>

                <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12'>
                  <p className='user-profile-content-label'>Last Name</p>
                  <p className='user-profile-content-p'>Contreras Gonzales</p>
                </div>

                <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12'>
                  <p className='user-profile-content-label'>Email</p>
                  <p className='user-profile-content-p'>robertog-18@hotmail.com</p>
                </div>

                <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12'>
                  <p className='user-profile-content-label'>Role</p>
                  <p className='user-profile-content-p'>admin</p>
                </div>

                <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12'>
                  <p className='user-profile-content-label'>Birth Date</p>
                  <p className='user-profile-content-p'>2002-03-12</p>
                </div>

                <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12'>
                  <p className='user-profile-content-label'>Registed Date</p>
                  <p className='user-profile-content-p'>2024-02-05</p>
                </div>

                <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12'>
                  <p className='user-profile-content-label'>Updated Date</p>
                  <p className='user-profile-content-p'>2024-02-05</p>
                </div>
              </div>
            ) : contentSelect === 'edit-profile' ?
            (
              <form action="">
                <div className='user-profile-edit row'>
                  <h5>Edit Profile</h5>
                  <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12 d-flex justify-content-center'>
                    <TextField
                      variant='outlined'
                      size='small'
                      label='First Name'
                      id='firstName'
                      name='firstName'
                      sx={{ marginBottom: '20px' }}
                    />
                  </div>

                  <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12 d-flex justify-content-center'>
                    <TextField
                      variant='outlined'
                      size='small'
                      label='Last Name'
                      id='lastName'
                      name='lastName'
                      sx={{ marginBottom: '20px' }}
                    />
                  </div>

                  <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12 d-flex justify-content-center'>
                    <TextField
                      variant='outlined'
                      size='small'
                      label='Email'
                      id='email'
                      name='email'
                      sx={{ marginBottom: '20px' }}
                    />
                  </div>

                  <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12 d-flex justify-content-center'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          name='birthDate'
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
                    </LocalizationProvider>
                  </div>
                  <Button
                    variant='contained'
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
              <form action="">
                <div className="user-profile-password row">
                  <h5>Change password</h5>
                  <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12 d-flex justify-content-center'>
                    <TextField
                      variant='outlined'
                      type='password'
                      placeholder='********'
                      size='small'
                      label='Password'
                      id='firstName'
                      name='firstName'
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
                      id='lastName'
                      name='lastName'
                      sx={{ marginBottom: '20px' }}
                    />
                  </div>
                  <Button
                    variant='contained'
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
    </>
  )
}
