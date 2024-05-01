import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { onStartRecovery, onStartRegister } from '../../../../../store';
import { useAuthApi } from '../../../hook/useAuthApi';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../../../styles/LoginStyle.css';
import { IUserLoginInputs } from '../../../model';

const inputStyle = {
  width: '225px',
  marginTop: '5px',
  marginBottom: '5px'
}

export const Login = () => {
  const { login } = useAuthApi();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset
  } = useForm<IUserLoginInputs>();

  const onSubmit: SubmitHandler<IUserLoginInputs> = (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    login(data);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='auth-box-title'>
          <h2 className='auth-title'>Welcome to User Management</h2>
          <span className='auth-span'>Created by </span><a className='auth-link-github' href="https://github.com/roberto2002-03-12" target='_blank'>roberto2002-03-12@github</a>
        </div>
        <div className='auth-inputs'>
          <TextField
            error={ errors.email && isSubmitted }
            helperText={ errors.email && isSubmitted ? errors.email.message : '' }
            label='Email'
            variant='standard'
            placeholder='example@email.com'
            {
              ...register(
                'email', 
                {
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Invalid email'
                  }
                }
              )
            }
            style={inputStyle}
          />
          <TextField
            error={ errors.password && isSubmitted }
            helperText={ errors.password && isSubmitted ? errors.password.message : '' }
            label='Password'
            variant='standard'
            placeholder='******'
            {
              ...register('password', {
                required: 'Password required',
                minLength: {
                  value: 8,
                  message: 'Password must have at least 8 characteres'
                }
              })
            }
            type='password'
            style={inputStyle}
          />
          <div className='auth-link'>
            <span
              className='auth-recovery-link'
              onClick={() => dispatch(onStartRecovery())}
            >
              Forgot password?
            </span>
            <span
              className='auth-recovery-link'
              onClick={() => dispatch(onStartRegister())}
            >
              Sign up
            </span>
          </div>
          <Button
            type='submit'
            variant='contained'
            style={{ backgroundColor: '#3F53FE' }}
          >
            Login
          </Button>
        </div>
      </form>
    </>
  )
}
