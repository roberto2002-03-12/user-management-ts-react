import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useUserManagementApi } from '../../hooks/useUserManagementApi';
import { NavBar } from '../../components';
import { IAction } from '../../models/privileges.model';
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
import { SmallLoading, Loading } from '../../../../shared';
import { TextFieldWithHookForm } from '../../components'
import '../../styles/RoleCreateStyle.css';
import { IStoreRedux } from '../../../../store';
import { IRoleInputsEdit } from '../../models';

export const RoleEdit = () => {
  const { getOneRole, getRoutes, editRole } = useUserManagementApi();
  const { role, routes, loadingState, loadingRoutesState } = useSelector((state: IStoreRedux) => state.userManagement);
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedPrivileges, setSelectedPrivileges] = useState<IAction[]>(role.action ?? []);

  const {
    handleSubmit,
    formState: { errors, isSubmitted },
    control,
    setValue
  } = useForm<IRoleInputsEdit>();

  useEffect(() => {
    getOneRole(parseInt(id!), true);
    getRoutes();
    if (typeof role.action !== 'undefined') {
      setSelectedPrivileges(role.action)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof role.action !== 'undefined') {
      setSelectedPrivileges(role.action)
    }
    setValue('roleName', role.roleName);
    setValue('description', role.description);
  }, [role]);



  const [searchUrl, setSearchUrl] = useState<string>('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCheckBoxChange = (idAction: number, actionName: string) => (_event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPrivileges((prev: IAction[]) => {
      const selectedAction = prev.find(a => a.id === idAction);
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
    });
  };

  const filteredPrivileges = useMemo(() => {
    return routes.filter(permiso => permiso.url.toLowerCase().includes(searchUrl.toLowerCase()))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchUrl]);
  
  const onSubmit: SubmitHandler<IRoleInputsEdit> = (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    const privileges = selectedPrivileges;
    editRole(data, parseInt(id!), privileges);
  };

  return (
    <>
      <NavBar />
      <div className='container role-create'>
        <h5>Edit role</h5>
        {
          loadingState === 'finished' ? (
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
                Edit role
              </Button>
            </div>
            
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 role-create-inputs">
                <TextFieldWithHookForm 
                  control={control}
                  name='roleName'
                  label='Role name'
                  defaultValue={role.roleName}
                  error={ errors.roleName && isSubmitted }
                  helperText={ errors.roleName && isSubmitted ? errors.roleName.message : '' }
                  rules={{
                    required: false,
                    minLength: {
                      value: 3,
                      message: 'Role name must have at least 3 characters long'
                    },
                    maxLength: {
                      value: 45,
                      message: 'Max lenght is 45 characteres'
                    }
                  }}
                />

                <TextFieldWithHookForm 
                  control={control}
                  name='description'
                  label='Description'
                  defaultValue={role.description}
                  error={ errors.description && isSubmitted }
                  helperText={ errors.description && isSubmitted ? errors.description.message : '' }
                  sx={{ 
                    width: '90%',
                    marginTop: '30px',
                    marginBottom: '50px' 
                  }}
                  rules={{
                    required: false,
                    maxLength: {
                      value: 255,
                      message: 'Max lenght is 255 characteres'
                    }
                  }}
                  rows={5}
                  multiline
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
                    loadingRoutesState === 'finished' ? (
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
                                      checked={selectedPrivileges.some(a => a.id === act.id)}
                                      onChange={handleCheckBoxChange(act.id, act.actionName)}
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
                    ) : (
                      <SmallLoading/>
                    )
                  }
                </div>
              </div>
            </div>
          </form>
          ) : (
            <Loading />
          )
        }
        
      </div>
    </>
  )
}
