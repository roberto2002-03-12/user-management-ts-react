import { Link } from 'react-router-dom';
import { useUserManagementApi } from '../../hooks/useUserManagementApi'
import ModeIcon from '@mui/icons-material/Mode';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Delete from '@mui/icons-material/Delete'
import { SmallLoading } from '../../../../shared/SmallLoading';
import { truncateString } from '../../../../helpers'
import { TypeLoadingState } from '../../../../store';
import { IRole } from '../../models';
import Swal from 'sweetalert2';

export const RolesTable = (
  { 
    roles,
    loadingState
  } : {
    roles: IRole[];
    loadingState: TypeLoadingState
  }
) => {

  const { desactivateRole } = useUserManagementApi()

  const handleDelete = (id: number, active: boolean) => {
    Swal.fire({
      title: `Are you sure you want to ${active === true ? 'desactivate' : 'activate'} this role`,
      showCancelButton: true,
      confirmButtonText: 'Sure',
    }).then((result) => {
      if (result.isConfirmed) {
        desactivateRole(id);
      }
    });
    
  };
  
  return (
    <>
      <div className='role-table-box'>
        {
          loadingState === 'finished' ? 
          (
            <table className="table table-striped role-table">
              <thead>
                <tr>
                  <th scope='col'>Role name</th>
                  <th scope='col'>Description</th>
                  <th scope='col'>Registed at</th>
                  <th scope='col'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  roles.map(row => (
                    <tr key={ row.id }>
                    <td> <p>{ row.roleName }</p> </td>
                    <td> <p>{ `${truncateString(row.description ?? '')}` }</p> </td>
                    <td> <p>{ `${row.created_at}` }</p> </td>
                    <td>
                      <button
                        style={{
                          border: '0',
                          width: '25px',
                        }}
                        onClick={() => handleDelete(row.id, row.active)}
                      >
                        <Delete color='error'/>
                      </button>
                      <Link to={`/user-management/roles/edit/${row.id}`}>
                        <ModeIcon sx={{ color: '#F7AC2A', marginLeft: '5px' }}/>
                      </Link>
                      <Link to={`/user-management/roles/${row.id}`}>
                        <RemoveRedEyeIcon sx={{ marginLeft: '5px' }}/>
                      </Link>
                    </td>
                  </tr>
                  ))
                }
              </tbody>
            </table>
          ) : (
            <div
              style={{
                margin: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '300px',
                width: '300px'
              }}
            >
              <SmallLoading />
            </div>
          )
        }
      </div>
    </>
  )
}
