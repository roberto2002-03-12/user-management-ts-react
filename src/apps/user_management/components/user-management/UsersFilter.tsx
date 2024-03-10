import React from 'react'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const UsersFilter = () => {
  return (
    <div className='um-filters'>
      <TextField
        name='fullName'
        label='Filter by Full Name'
        variant='filled'
        size='small'
        InputLabelProps={{
          style: {
            fontSize: '12px'
          }
        }}
        sx={{
          width: '180px'
        }}
      />

      <TextField
        name='email'
        label='Filter by Email'
        variant='filled'
        size='small'
        InputLabelProps={{
          style: {
            fontSize: '12px'
          }
        }}
        sx={{
          width: '180px'
        }}
      />

      <FormControl 
        variant='filled' 
        sx={{ width: '180px' }} 
        size='small'
      >
        <InputLabel id="role-type" sx={{ fontSize: '12px' }}>Filter by Roles</InputLabel>
        <Select
          labelId="role-type"
          id="role-type"
          label="Filter by Roles"
          name='roleName'
        >
          <MenuItem value={'admin'}>Admin</MenuItem>
          <MenuItem value={'manager'}>Manager</MenuItem>
        </Select>
      </FormControl>

      <FormControl 
        variant='filled' 
        sx={{ width: '180px' }} 
        size='small'
      >
        <InputLabel id="user-type-status" sx={{ fontSize: '12px' }}>Filter by active</InputLabel>
        <Select
          labelId="user-type-status"
          id="user-type-status"
          label="Filter by active"
          name='status'
        >
          <MenuItem value={'true'}>Active</MenuItem>
          <MenuItem value={'false'}>Disabled</MenuItem>
        </Select>
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            name='startDate'
            label='Filter by register date (start)'
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
              width: '180px'
            }}
          />

          <DatePicker
            name='endDate'
            label='Filter by register date (end)'
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
              width: '180px'
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  )
}
