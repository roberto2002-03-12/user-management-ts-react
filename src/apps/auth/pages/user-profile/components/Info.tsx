import { IUser } from '../../../model'

export const Info = ({ user }: { user: IUser }) => {
  return (
    <div className='user-profile-info row'>
      <h5>User info</h5>
      <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12'>
        <p className='user-profile-content-label'>First Name</p>
        <p className='user-profile-content-p'>{ user.profile && user.profile.firstName ? user.profile.firstName : 'not registed'}</p>
      </div>

      <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12'>
        <p className='user-profile-content-label'>Last Name</p>
        <p className='user-profile-content-p'>{ user.profile && user.profile.lastName  ? user.profile.lastName : 'not registed'}</p>
      </div>

      <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12'>
        <p className='user-profile-content-label'>Email</p>
        <p className='user-profile-content-p'>{ user.email }</p>
      </div>

      <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12'>
        <p className='user-profile-content-label'>Phone number</p>
        <p className='user-profile-content-p'>{ user.profile && user.profile.phoneNumber ? user.profile.phoneNumber : 'not registed'}</p>
      </div>

      <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12'>
        <p className='user-profile-content-label'>Main Role</p>
        <p className='user-profile-content-p'>{ user.role && user.role.length > 0 ? user.role[0].roleName : 'not assigned'}</p>
      </div>

      <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12'>
        <p className='user-profile-content-label'>Birth Date</p>
        <p className='user-profile-content-p'>{ user.profile && user.profile.birth ? `${user.profile.birth}` : 'not registed'}</p>
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
  )
}
