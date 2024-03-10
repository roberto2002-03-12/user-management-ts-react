import { useSelector } from 'react-redux';
import { Login, Recovery, ChangePassword } from '../components';
import { SmallLoading }  from '../../../shared';
import { IStoreRedux } from '../../../store'
import '../styles/AuthStyle.css'

export const Auth = () => {
  const { authState } = useSelector((state: IStoreRedux) => state.auth);

  return (
    <div className="auth-container">
      <div className='auth-modal'>
        {
          authState === 'checking' ? (
            <SmallLoading />
          ) : authState === 'not-authenticated' ? (
            <Login />
          ) : authState === 'recovery' ? (
            <Recovery />
          ) : (
            <ChangePassword />
          )
        }
      </div>
    </div>
  )
}
