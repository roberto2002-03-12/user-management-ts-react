import { SetURLSearchParams } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IUserQuery } from '../../../models/inputs.model';

const defaultValues: IUserQuery = {
  active: '',
  createdAtStart: null,
  createdAtEnd: null,
  page: 0,
  email: '',
  fullName: '',
  roleName: ''
};

const inputStyle = {
  width: '180px',
  marginLeft: '5px',
  marginRight: '5px'
}

export const Filters = ({ 
  setParams, 
  page
  }:{ 
  setParams: SetURLSearchParams;
  page: number; 
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitted },
    reset
  } = useForm<IUserQuery>({defaultValues});

  const onSubmit: SubmitHandler<IUserQuery> = (data) => {
    if (Object.keys(errors).length > 0) return;

    const paramsObj: Record<string, string | string[]> = {};

    (Object.keys(data) as (keyof typeof data)[]).forEach(key => {
      if (typeof data[key] !== 'undefined' && data[key] !== '' && data[key] !== null && data[key]) {
        paramsObj[key] = String(data[key]);
      }
    });

    setParams({ ...paramsObj, page: `${page}` })
  }

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <div className='um-filters'>
        <TextField
          {
          ...register('fullName', {
            required: false,
            maxLength: {
              value: 65,
              message: 'Max characteres 65'
            }
          })
          }
          error={ errors.fullName && isSubmitted }
          helperText={ errors.fullName && isSubmitted ? errors.fullName.message : '' }
          label='Filter by Full Name'
          variant='filled'
          size='small'
          InputLabelProps={{
            style: {
              fontSize: '12px'
            }
          }}
          sx={inputStyle}
        />

        <TextField
          {
            ...register('email', {
              maxLength: {
                value: 105,
                message: 'Max characteres 105'
              }
            })
          }
          error={ errors.email && isSubmitted }
          helperText={ errors.email && isSubmitted ? errors.email.message : '' }
          label='Filter by Email'
          variant='filled'
          size='small'
          InputLabelProps={{
            style: {
              fontSize: '12px'
            }
          }}
          sx={inputStyle}
        />

        <TextField
          {
          ...register('roleName', {
            maxLength: {
              value: 45,
              message: 'Max characteres 45'
            }
          })
          }
          error={ errors.roleName && isSubmitted }
          helperText={ errors.roleName && isSubmitted ? errors.roleName.message : '' }
          label='Filter by Role name'
          variant='filled'
          size='small'
          placeholder='super admin'
          InputLabelProps={{
            style: {
              fontSize: '12px'
            }
          }}
          sx={inputStyle}
        />

        <FormControl
          variant='filled'
          sx={inputStyle}
          size='small'
        >
          <InputLabel id="user-type-status" sx={{ fontSize: '12px' }}>Filter by active</InputLabel>
          <Select
            labelId="user-type-status"
            id="user-type-status"
            label="Filter by active"
            {
            ...register('active', {
              required: false
            })
            }
            defaultValue={''}
          >
            <MenuItem value={'true'}>Active</MenuItem>
            <MenuItem value={'false'}>Disabled</MenuItem>
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name='createdAtStart'
            control={control}
            render={
              ({ field }) => (
                <DatePicker
                  {...field}
                  label='Register date (start)'
                  slotProps={{
                    textField: {
                      variant: 'filled',
                      size: 'small',
                      InputLabelProps: {
                        style: {
                          fontSize: '12px'
                        }
                      }
                    }
                  }}
                  sx={inputStyle}
                />
              )
            }
          />

          <Controller 
            name='createdAtEnd'
            control={control}
            render={
              ({field}) => (
                <DatePicker
                  {...field}
                  label='Register date (end)'
                  slotProps={{
                    textField: {
                      variant: 'filled',
                      size: 'small',
                      InputLabelProps: {
                        style: {
                          fontSize: '12px'
                        }
                      }
                    }
                  }}
                  sx={inputStyle}
                />
              )
            }
          />
        </LocalizationProvider>
      </div>
      <div className="um-buttons">
        <Button
          variant='contained'
          size='small'
          type='submit'
        >
          Apply filters
        </Button>
        <Button
          variant='contained'
          size='small'
          onClick={() => reset()}
        >
          Reset filters
        </Button>
      </div>
    </form>
  )
}
