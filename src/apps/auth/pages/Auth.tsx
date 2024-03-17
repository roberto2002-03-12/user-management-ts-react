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
          ) : authState === 'authenticated' ? (
            <div
              style={{
                height: '300px',
                width: '300px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <h2
                style={{
                  fontSize: '24px',
                  color: 'gray'
                }}
              >Alredy logged</h2>
            </div>
          ) : (
            <ChangePassword />
          )
        }
      </div>
    </div>
  )
}
