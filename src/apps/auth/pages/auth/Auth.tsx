import { useSelector } from 'react-redux';
import { Login, Recovery, ChangePassword, Register } from './components';
import { SmallLoading } from '../../../../shared';
import { IStoreRedux } from '../../../../store'
import '../../styles/AuthStyle.css'

export const Auth = () => {
  const { authState } = useSelector((state: IStoreRedux) => state.auth);

  return (
    <div className="auth-container">
      <div className={authState !== 'register' ? `auth-modal` : `register-modal`}>
        {
          authState === 'checking' ? (
            <SmallLoading />
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
          ) : authState === 'not-authenticated' ? (
            <Login />
          ) : authState === 'register' ? (
            <Register  />
          ) : authState === 'recovery' || authState === 'not-sent' ? (
            <Recovery />
          ) : authState === 'sent' ? (
            <ChangePassword />
          ) : (
            <></>
          )
        }
      </div>
    </div>
  )
}
