import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useUserManagementApi } from '../../hooks/useUserManagementApi';
import { NavBar } from '../../components';
import { IAction } from '../../models/privileges.model'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SmallLoading } from '../../../../shared';
import '../../styles/RoleCreateStyle.css';
import { IRoleInputs } from '../../models'
import { IStoreRedux } from '../../../../store';

export const RoleCreate = () => {
  const navigate = useNavigate();
  const { routes, loadingState } = useSelector((state: IStoreRedux) => state.userManagement);
  const { getRoutes, createRole } = useUserManagementApi();
  const [selectedPrivileges, setSelectedPrivileges] = useState<IAction[]>([]);
  const [searchUrl, setSearchUrl] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset
  } = useForm<IRoleInputs>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCheckBoxChange = (idAction: number, actionName: string) => (_event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPrivileges((prev: IAction[]) => {
      const selectedAction = prev.find(p => p.id === idAction);
      if (selectedAction) {
        return prev.filter(a => a.id !== selectedAction.id)
      } else {
        return [
          ...prev,
          {
            id: idAction,
            actionName
          }
        ]
      }
    })
  }

  useEffect(() => {
    getRoutes()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filteredPrivileges = useMemo(() => {
    return routes.filter(permiso => permiso.url.toLowerCase().includes(searchUrl.toLowerCase()))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchUrl])

  const onSubmit: SubmitHandler<IRoleInputs> = (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    if (selectedPrivileges.length > 0) {
      const actual = selectedPrivileges
      createRole(data, actual);
    } else {
      createRole(data);
    }
    reset();
  };

  return (
    <>
      <NavBar />
      <div className='container role-create'>
        <h5>Create role</h5>
        <form onSubmit={ handleSubmit(onSubmit) } className='horrible-form-wich-destroy-everything'>
          <div className='role-create-options'>
            <span>
              <Button 
                variant='text'
                sx={{
                  color: 'gray',
                  width: '20px',
                }}
                size='small'
                onClick={() => navigate(-1)}
              >
                <ArrowBackIcon/>
              </Button> 
              Go back
            </span>
            <Button 
              variant='contained'
              size='small'
              type='submit'
            >
              Create role
            </Button>
          </div>
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 role-create-inputs">
              <TextField
                error={ errors.roleName && isSubmitted }
                helperText={ errors.roleName && isSubmitted ? errors.roleName.message : '' }
                {
                  ...register('roleName', {
                    maxLength: {
                      value: 45,
                      message: `Max length is 45 characteres`
                    },
                    minLength: {
                      value: 3,
                      message: `There must be at least 3 characteres`
                    },
                    required: {
                      value: true,
                      message: 'Role name is requried'
                    }
                  })
                }
                variant='outlined'
                size='small'
                placeholder='cat super-admin'
                label='Role name'
                sx={{
                  width: '180px',
                }}
              />

              <TextField
                {
                  ...register('description', {
                    maxLength: {
                      value: 255,
                      message: 'Max lenght is 255 characteres'
                    },
                    required: false
                  })
                }
                variant='outlined'
                size='small'
                placeholder='I can create whatever cat I want'
                label='Description'
                multiline
                rows={ 5 }
                sx={{
                  marginTop: '30px',
                  marginBottom: '50px'
                }}
                className='role-description-input'
              />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 role-create-privileges-section">
              <TextField
                variant='outlined'
                label='Search url'
                name='url'
                sx={{ marginBottom: '10px', marginTop: '5px' }}
                size='small'
                value={searchUrl}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setSearchUrl(ev.target.value)}
              />
              <div
                style={{
                  paddingBottom: '50px',
                  height: '300px',
                  maxHeight: '400px',
                  overflowY: 'auto'
                }}
              >
                {
                  loadingState === 'loading' ? (
                    <SmallLoading />
                  ) : (
                    (searchUrl === '' ? routes : filteredPrivileges).map((privilege) => (
                      <Accordion key={privilege.id}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>{privilege.url}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <FormGroup>
                            {privilege.action.map((act) => (
                              <FormControlLabel
                                key={act.id}
                                control={
                                  <Checkbox
                                    checked={ selectedPrivileges.some(a => a.id === act.id) }
                                    onChange={ handleCheckBoxChange(act.id, act.actionName) }
                                    name={act.actionName}
                                    value={act.actionName}
                                  />
                                }
                                label={act.actionName}
                              />
                            ))}
                          </FormGroup>
                        </AccordionDetails>
                      </Accordion>
                    ))
                  )
                }
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
