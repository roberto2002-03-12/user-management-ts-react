import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { onStartLogin } from '../../../../../store';
import { useAuthApi } from '../../../hook/useAuthApi';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../../../styles/RecoveryStyle.css';
import { IRecoveryInputs } from '../../../model';

export const Recovery = () => {
  const { sendRecovery } = useAuthApi();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset
  } = useForm<IRecoveryInputs>();

  const onSubmit: SubmitHandler<IRecoveryInputs> = (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    sendRecovery(data);
    reset();
  };

  return (
    <>
      <div
        className='auth-recovery-back'
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '350px',
          height: '400px'
        }}
      >
        <Button
          sx={{
            marginTop: '20px',
            width: '18px',
            height: '18px',
            color: 'gray'
          }}
          variant='text'
          onClick={() => dispatch(onStartLogin())}
        >
          <ArrowBackIcon />
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="auth-box-title-recovery">
          <h2>Recovery</h2>
          <p>Please, fill the input with your email in order to send you a code to recover your password</p>
        </div>
        <TextField
          error={errors.email && isSubmitted}
          helperText={errors.email && isSubmitted ? errors.email.message : ''}
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
          variant='standard'
          style={{ width: '225px' }}
          name='email'
          label='Email'
          placeholder='example@email.com'
        />

        <Button
          variant='contained'
          style={{
            marginTop: '20px',
            backgroundColor: '#3F53FE'
          }}
          type='submit'
        >
          Send code
        </Button>
      </form>

    </>
  )
}
