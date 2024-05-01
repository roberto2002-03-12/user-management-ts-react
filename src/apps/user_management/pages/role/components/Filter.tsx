
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IRoleQuery } from '../../../models';
import { SetURLSearchParams } from 'react-router-dom';
import Button from '@mui/material/Button';

const defaultValues: IRoleQuery = {
  active: '',
  createdAtStart: null,
  createdAtEnd: null,
  page: 0,
  roleName: ''
};

const inputStyle = {
  width: '180px',
  marginLeft: '15px',
  marginRight: '15px' 
}

const buttonStyle = {
  width: '150px'
}

export const Filter = ({
  setParams, 
  page
  }:{
  setParams: SetURLSearchParams;
  page: number; 
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<IRoleQuery>({defaultValues});

  const onSubmit: SubmitHandler<IRoleQuery> = (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    const paramsObj: Record<string, string | string[]> = {};

    (Object.keys(data) as (keyof typeof data)[]).forEach(key => {
      if (typeof data[key] !== 'undefined' && data[key] !== '' && data[key] !== null && data[key]) {
        paramsObj[key] = String(data[key]);
      }
    });

    setParams({...paramsObj, page: `${page}`});
    // data.page = page;
    // getRoles(data);
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
          sx={inputStyle}
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
          sx={inputStyle} 
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
                  sx={inputStyle}
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
                  sx={inputStyle}
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
          sx={buttonStyle}
        >
          Apply filters
        </Button>
        <Button
          onClick={() => reset({ roleName: '', active: 'true', createdAtEnd: undefined, createdAtStart: undefined })}
          variant='contained'
          size='small'
          sx={buttonStyle}
        >
          Delete filters
        </Button>
      </div>
    </form>
  )
}
