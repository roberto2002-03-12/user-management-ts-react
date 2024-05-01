import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuthApi } from '../../../hook/useAuthApi'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { IUserChangePasswordInputs } from '../../../model'

const inputStyles = {
  marginTop: '15px',
  marginBottom: '15px',
  flexBasis: '40%',
  marginRight: '5%',
  marginLeft: '5%',
  '@media (max-width: 578px)': {
    flexBasis: '90%',
  }
}

export const ChangePassword = () => {
  const { changePassword } = useAuthApi();

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
    <form onSubmit={ handleSubmitPassword(onSubmitPassword) }>
      <div className="user-profile-password row">
        <h5>Change password</h5>
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
            sx={inputStyles}
          />


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
            sx={inputStyles}
          />
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
