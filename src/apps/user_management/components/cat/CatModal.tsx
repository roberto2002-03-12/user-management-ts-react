import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useCatApi } from '../../hooks/useCatApi'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { ICat } from '../../models'
import { SmallLoading } from '../../../../shared';
import { IStoreRedux } from '../../../../store';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const textFieldStyle = {
  width: '180px',
  marginTop: '10px',
  marginBottom: '10px'
}

export const CatModal = () => {
  const { loadingState } = useSelector((state: IStoreRedux) => state.cat);
  const [modalState, setModalState] = useState(false);
  const handleOpen = () => setModalState(true);
  const handleClose = () => setModalState(false);

  const { createCats } = useCatApi();

  const {
    register: registerCat,
    formState: { errors: errorsCat, isSubmitted: isSubmittedCat },
    reset: resetCat,
    control: controlCat,
    handleSubmit
  } = useForm<ICat>();

  const onSubmit: SubmitHandler<ICat> = (data) => {
    if (Object.keys(errorsCat).length > 0) return;
    createCats(data);
    resetCat();
    handleClose();
  }

  return (
    <>
      <Button variant='outlined' size='small' onClick={handleOpen}>Create cat</Button>
      <Modal
        open={modalState}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create cat
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {
                loadingState === 'loading' ? (
                  <div 
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexWrap: 'wrap'
                    }}
                  >
                    <SmallLoading />
                  </div>
                ) : (
                  <>
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                      }}
                    >
                      <TextField
                        {
                        ...registerCat('name', {
                          required: true,
                          minLength: {
                            value: 3,
                            message: 'Minimum charactares are 3'
                          },
                          maxLength: {
                            value: 45,
                            message: 'Maximum charactares are 45'
                          }
                        })
                        }
                        error={errorsCat.name && isSubmittedCat}
                        helperText={errorsCat.name && isSubmittedCat ? errorsCat.name.message : ''}
                        variant='filled'
                        size='small'
                        placeholder='Gringo'
                        label='Cat name'
                        sx={textFieldStyle}
                      />
                      <TextField
                        {
                        ...registerCat('race', {
                          required: true,
                          minLength: {
                            value: 3,
                            message: 'Minimum charactares are 3'
                          },
                          maxLength: {
                            value: 45,
                            message: 'Maximum charactares are 45'
                          }
                        })
                        }
                        error={errorsCat.race && isSubmittedCat}
                        helperText={errorsCat.race && isSubmittedCat ? errorsCat.race.message : ''}
                        variant='filled'
                        size='small'
                        placeholder='Orange Tabby'
                        label='Cat race'
                        sx={textFieldStyle}
                      />
                      <TextField
                        {
                        ...registerCat('price', {
                          required: true,
                          min: {
                            value: 1,
                            message: 'Minimum price 1'
                          }
                        })
                        }
                        error={errorsCat.price && isSubmittedCat}
                        helperText={errorsCat.price && isSubmittedCat ? errorsCat.price.message : ''}
                        variant='filled'
                        size='small'
                        placeholder='S/. 6000'
                        label='Price'
                        type='number'
                        sx={textFieldStyle}
                      />
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                          name='birth'
                          control={controlCat}
                          render={
                            ({ field }) => (
                              <DatePicker
                                {...field}
                                label='Cat birth'
                                slotProps={{
                                  textField: {
                                    variant: 'filled',
                                    size: 'small',
                                    error: errorsCat.birth && isSubmittedCat,
                                    helperText: errorsCat.birth && isSubmittedCat ? errorsCat.birth.message : ''
                                  }
                                }}
                                sx={textFieldStyle}
                              />
                            )
                          }
                          rules={{
                            required: 'Birth is required'
                          }}
                        />
                      </LocalizationProvider>
                      <TextField
                        {
                        ...registerCat('photoUrl', {
                          required: false,
                        })
                        }
                        variant='filled'
                        size='small'
                        placeholder='google.com/images'
                        label='Cat photo url'
                        sx={textFieldStyle}
                      />
                    </div>
                    <Button
                      variant='contained'
                      size='small'
                      type='submit'
                    >
                      Submit
                    </Button>
                  </>
                )
              }
            </form>
          </Typography>
        </Box>
      </Modal>
    </>
  )
}
