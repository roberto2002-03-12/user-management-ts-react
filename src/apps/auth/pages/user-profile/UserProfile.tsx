import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavBar } from '../../../user_management/components';
import Button from '@mui/material/Button';

import { Loading } from '../../../../shared';
import '../../styles/UserProfileStyle.css';
import { IStoreRedux } from '../../../../store';
import { Info, EditProfile, ChangePassword } from './components'

type UserContentSelectType = 'info' | 'edit-profile' | 'change-password';

export const UserProfile = () => {
  const { user, profileState } = useSelector((state: IStoreRedux) => state.auth);
  const [ contentSelect, setContentSelect ] = useState<UserContentSelectType>('info');

  const handleChangeContent = (arg: UserContentSelectType): void => {
    setContentSelect(arg);
  };

  return (
    <>
      <NavBar />
      {
        profileState === 'loading' ?
        <Loading /> :
      (
      <div className='user-profile'>
        <div className='user-profile-side'>
          <div className='user-profile-img'>
            <img src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png" alt="user profile"/>
          </div>
          <p className='user-profile-img-p'>{ user.profile && user.profile.firstName && user.profile.lastName ? `${user.profile.firstName} ${user.profile.lastName}` : 'not registed' }</p>
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
              <Info user={user} />
            ) : contentSelect === 'edit-profile' ?
            (
              <EditProfile user={user} />
            ) : 
            (
              <ChangePassword />
            )
          }
        </div>
      </div>
      )
      }
    </>
  )
}
