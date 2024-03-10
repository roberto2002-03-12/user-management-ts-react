import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuthApi } from '../hook/useAuthApi'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import '../styles/ChangePasswordStyle.css';
import { IRecoveryChangePasswordInputs } from '../model'

export const ChangePassword = () => {
  const { changePasswordRecovery } = useAuthApi();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset, setError
  } = useForm<IRecoveryChangePasswordInputs>();

  const onSubmit: SubmitHandler<IRecoveryChangePasswordInputs> = (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    if (data.repeatPassword !== data.newPassword) {
      setError('repeatPassword', {
        message: 'Password must be equal'
      })

      return;
    }

    changePasswordRecovery(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="auth-password-title">
        <h2>Change your password</h2>
      </div>
      <div className="auth-password-inputs">
        <TextField
          error={errors.newPassword && isSubmitted}
          helperText={errors.newPassword && isSubmitted ? errors.newPassword.message : ''}
          {
            ...register(
              'newPassword',
              {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characteres'
                }
              }
            )
          }
          type='password'
          label='Password'
          variant='standard'
          placeholder='*********'
        />
        <TextField
          error={errors.repeatPassword && isSubmitted}
          helperText={errors.repeatPassword && isSubmitted ? errors.repeatPassword.message : ''}
          {
            ...register(
              'repeatPassword',
              {
                required: 'You must repeat your password',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characteres'
                }
              }
            )
          }
          type='password'
          name='repeatPassword'
          label='Repeat password'
          variant='standard'
          placeholder='*********'
        />
        <TextField
          error={errors.recoveryToken && isSubmitted}
          helperText={errors.recoveryToken && isSubmitted ? errors.recoveryToken.message : ''}
          {
            ...register('recoveryToken', {
              required: 'You must enter your code to continue'
            })
          }
          label='Code to confirm'
          variant='standard'
        />
      </div>
      <Button
        style={{
          backgroundColor: '#3F53FE',
          marginTop: '20px'
        }}
        variant='contained'
        type='submit'
      >
        Confirm
      </Button>
    </form>
  )
}
