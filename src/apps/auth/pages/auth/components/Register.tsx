import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useAuthApi } from '../../../hook/useAuthApi';
import { onStartLogin } from '../../../../../store';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { IUserRegisterInputs } from '../../../model'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import '../../../styles/RegisterStyle.css'

const inputStyle = {
  width: '225px',
  marginTop: '5px',
  marginBottom: '5px',
  marginRight: '15px',
  marginLeft: '15px'
}

export const Register = () => {
  const { register: registerApi } = useAuthApi()
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
    control
  } = useForm<IUserRegisterInputs>({
    defaultValues: {
      birth: null
    }
  });

  const onSubmit: SubmitHandler<IUserRegisterInputs> = (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    registerApi(data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className='register-title'>Register</h2>
      <div className="register-inputs">
        <TextField
          error={errors.email && isSubmitted}
          helperText={errors.email && isSubmitted ? errors.email.message : ''}
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
          error={errors.password && isSubmitted}
          helperText={errors.password && isSubmitted ? errors.password.message : ''}
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

        <TextField
          error={errors.firstName && isSubmitted}
          helperText={errors.firstName && isSubmitted ? errors.firstName.message : ''}
          label='First name'
          variant='standard'
          placeholder='Roberto'
          {
          ...register('firstName', {
            required: 'First name is required',
            minLength: {
              value: 3,
              message: 'Must have at least 3 characteres'
            },
            maxLength: {
              value: 55,
              message: 'Max characteres is 55'
            }
          })
          }
          style={inputStyle}
        />

        <TextField
          error={errors.lastName && isSubmitted}
          helperText={errors.lastName && isSubmitted ? errors.lastName.message : ''}
          label='Last name'
          variant='standard'
          placeholder='Contreras'
          {
          ...register('lastName', {
            required: 'Last name is required',
            minLength: {
              value: 3,
              message: 'Must have at least 3 characteres'
            },
            maxLength: {
              value: 55,
              message: 'Max characteres is 55'
            }
          })
          }
          style={inputStyle}
        />

        <TextField
          error={errors.phoneNumber && isSubmitted}
          helperText={errors.phoneNumber && isSubmitted ? errors.phoneNumber.message : ''}
          label='Phonenumber'
          variant='standard'
          placeholder='+51 965 368 241'
          {
          ...register('phoneNumber', {
            required: 'Phonenumber is required',
            minLength: {
              value: 3,
              message: 'Must have at least 3 characteres'
            },
            maxLength: {
              value: 25,
              message: 'Max characteres is 55'
            },
            pattern: {
              value: /^[0-9() +-]*$/,
              message: 'Only numbers and "() + -" are allowed'
            }
          })
          }
          style={inputStyle}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name='birth'
            control={control}
            render={
              ({ field }) => (
                <DatePicker
                  {...field}
                  label='Birth Date'
                  slotProps={{
                    textField: {
                      variant: 'standard',
                    }
                  }}
                  sx={inputStyle}
                />
              )
            }
          />
        </LocalizationProvider>


        <p
          className='register-link'
          onClick={() => dispatch(onStartLogin())}
        >
          Alredy have an account?
        </p>

        <Button
          type='submit'
          variant='contained'
          style={{ backgroundColor: '#3F53FE' }}
        >
          Register
        </Button>
      </div>
    </form>
  )
}
