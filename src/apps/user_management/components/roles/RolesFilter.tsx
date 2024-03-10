import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom'
import { useUserManagementApi } from '../../hooks/useUserManagementApi'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IUserQuery } from '../../models'
import Button from '@mui/material/Button';

export const RolesFilter = () => {
  const { getRoles } = useUserManagementApi();
  const [params, setParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<IUserQuery>();

  const onSubmit: SubmitHandler<IUserQuery> = (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    const paramsObj: Record<string, string | string[]> = {};

    (Object.keys(data) as (keyof typeof data)[]).forEach(key => {
      if (typeof data[key] !== 'undefined' && data[key] !== '') {
        paramsObj[key] = String(data[key]);
      }
    });

    setParams(paramsObj);

    getRoles(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='role-filters'>
        <TextField
          variant='filled'
          {
            ...register('roleName', {
              required: false,
            })
          }
          sx={{ 
            width: '180px',
            marginLeft: '15px',
            marginRight: '15px' 
          }}
          InputLabelProps={{
            style: {
              fontSize: '12px'
            }
          }}
          size='small'
          label='Role name'
          placeholder='admin'
        />

        <FormControl 
          variant='filled' 
          sx={{ 
            width: '180px',
            marginLeft: '15px',
            marginRight: '15px'  
          }} 
          size='small'
        >
          <InputLabel id="role-type" sx={{ fontSize: '12px' }}>Role state</InputLabel>
          <Select
            labelId="role-type"
            id="role-type"
            label="Role state"
            {
              ...register('active', {
                required: false
              })
            }
            defaultValue={''}
          >
            <MenuItem value={'true'}>Active</MenuItem>
            <MenuItem value={'false'}>Unable</MenuItem>
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
                  label='register date (start)'
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
                  sx={{
                    width: '180px',
                    marginLeft: '15px',
                    marginRight: '15px'
                  }}
                  onChange={(date) => field.onChange(date)}
                  value={field.value ? new Date(field.value) : null} 
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
                  label='register date (end)'
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
                  sx={{
                    width: '180px',
                    marginLeft: '15px',
                    marginRight: '15px'
                  }}
                  onChange={(date) => field.onChange(date)}
                  value={field.value ? new Date(field.value) : null} 
                />
              )
            }
          />

          
        </LocalizationProvider>
      </div>
      <div className="role-filters-button">
        <Button
          type='submit'
          variant='contained'
          size='small'
          sx={{
            width: '150px'
          }}
        >
          Apply filters
        </Button>
        <Button
          onClick={() => reset({ roleName: '', active: 'true', createdAtEnd: undefined, createdAtStart: undefined })}
          variant='contained'
          size='small'
          sx={{
            width: '150px'
          }}
        >
          Delete filters
        </Button>
      </div>
    </form>
  )
}
