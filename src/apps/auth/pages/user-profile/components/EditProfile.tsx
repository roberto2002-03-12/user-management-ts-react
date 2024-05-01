import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { IUser, IUserProfileInputs } from '../../../model';
import { useAuthApi } from '../../../hook/useAuthApi';
import dayjs from 'dayjs';

const inputStyle = {
  marginTop: '15px',
  marginBottom: '15px',
  flexBasis: '40%',
  marginRight: '5%',
  marginLeft: '5%',
  '@media (max-width: 578px)': {
    flexBasis: '90%',
  }
}

export const EditProfile = ({ user }: { user: IUser }) => {
  const { updateProfile } = useAuthApi();

  const {
    register: registerProfile,
    formState: { errors: errorsProfile, isSubmitted: isSubmitedProfile },
    handleSubmit: handleSubmitProfile,
    control: controlProfile
  } = useForm<IUserProfileInputs>({
    defaultValues: {
      firstName: user.profile && user.profile.firstName ? user.profile.firstName : 'not registed',
      lastName: user.profile && user.profile.lastName ? user.profile.lastName : 'not registed',
      phoneNumber: user.profile && user.profile.phoneNumber ? user.profile.phoneNumber : 'not registed',
      birth: user.profile && user.profile.birth ? dayjs(user.profile.birth ?? '') : null
    }
  });

  const onSubmitProfile: SubmitHandler<IUserProfileInputs> = (data) => {
    if (Object.keys(errorsProfile).length > 0) return;
    updateProfile(data);
  }

  return (
    <form onSubmit={handleSubmitProfile(onSubmitProfile)}>
      <div className='user-profile-edit row'>
        <h5>Edit Profile</h5>
        <TextField
          variant='outlined'
          size='small'
          label='First Name'
          {
          ...registerProfile('firstName', {
            required: false,
            minLength: {
              value: 3,
              message: 'Min characteres 3'
            },
            maxLength: {
              value: 65,
              message: 'Max characteres 65'
            }
          })
          }
          error={errorsProfile.firstName && isSubmitedProfile}
          helperText={errorsProfile.firstName && isSubmitedProfile ? errorsProfile.firstName.message : ''}
          sx={inputStyle}
        />

        <TextField
          variant='outlined'
          size='small'
          label='Last Name'
          {
          ...registerProfile('lastName', {
            required: false,
            minLength: {
              value: 3,
              message: 'Min characteres 3'
            },
            maxLength: {
              value: 65,
              message: 'Max characteres 65'
            }
          })
          }
          error={errorsProfile.lastName && isSubmitedProfile}
          helperText={errorsProfile.lastName && isSubmitedProfile ? errorsProfile.lastName.message : ''}
          sx={inputStyle}
        />

        <TextField
          variant='outlined'
          size='small'
          label='Phone number'
          {
          ...registerProfile('phoneNumber', {
            required: false,
            maxLength: {
              value: 25,
              message: 'Max characteres 65'
            },
            pattern: {
              value: /^[0-9() +-]*$/,
              message: 'Only numbers and "() + -" are allowed'
            }
          })
          }
          error={errorsProfile.phoneNumber && isSubmitedProfile}
          helperText={errorsProfile.phoneNumber && isSubmitedProfile ? errorsProfile.phoneNumber.message : ''}
          sx={inputStyle}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name='birth'
            control={controlProfile}
            render={
              ({ field }) => (
                <DatePicker
                  {...field}
                  label='Birth Date'
                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      size: 'small',
                    }
                  }}
                  sx={inputStyle}
                />
              )
            }
          />
        </LocalizationProvider>

        <Button
          variant='contained'
          type='submit'
          size='small'
          sx={{
            width: '100px',
            marginTop: '20px',
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
