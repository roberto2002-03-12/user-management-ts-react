import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useUserManagementApi } from '../../hooks/useUserManagementApi'
import { NavBar } from '../../components';
import CircleIcon from '@mui/icons-material/Circle';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import '../../styles/RolePageStyle.css';
import { IStoreRedux } from '../../../../store'
import { useEffect } from 'react';

export const RolePage = () => {
  const navigate = useNavigate();
  const { getOneRole } = useUserManagementApi();
  const { role } = useSelector((state: IStoreRedux) => state.userManagement);
  const { id } = useParams();

  useEffect(() => {
    getOneRole(parseInt(id ?? '1'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <NavBar />
      <div className='container one-role-container'>
        <Button
          variant='text'
          onClick={() => navigate(-1)}
          sx={{
            width: '20px',
            color: 'gray'
          }}
        >
          <ArrowBackIcon sx={{ marginBottom: '5px'}}/>
        </Button> <span >Go back</span>
        <header>
          <CircleIcon color={ typeof role.active !== 'undefined' ? role.active === true ? 'success' : 'disabled' : 'disabled' } /> Active
        </header>
        <div className="row">
          <div className='one-role-aside col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12'>
            <div className="one-role-data-box">
              <h5 className='one-role-data-label'>Role name</h5>
              <p className='one-role-data-text'>{ role?.roleName }</p>
            </div>
            <div className="one-role-data-box">
              <h5 className='one-role-data-label'>Created at</h5>
              <p className='one-role-data-text'>{ `${role?.created_at}` }</p>
            </div>
            <div className="one-role-data-box">
              <h5 className='one-role-data-label'>Last update</h5>
              <p className='one-role-data-text'>{ `${role?.updated_at}` }</p>
            </div>
          </div>
          <div className="one-role-data-box-credentials col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
            {
              role?.route?.map((privilege, index) => (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>{privilege?.url ?? '---'}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>
                      {
                        privilege.action.map((act, index) => (
                          <FormControlLabel 
                            key={ index }
                            control={
                              <p></p>
                            }
                            label={ `- ${act?.actionName ?? '--'}` }
                          />
                        ))
                      }
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
              ))
            }
          </div>
          <div className="one-role-description col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="one-role-data-box-description">
              <h5 className='one-role-data-label'>Description</h5>
              <p className='one-role-data-text'>{ role?.description }</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
