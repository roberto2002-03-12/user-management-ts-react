import { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import ArticleIcon from '@mui/icons-material/Article';
import PetsIcon from '@mui/icons-material/Pets';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import EastIcon from '@mui/icons-material/East';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Box from '@mui/material/Box';
import { IStoreRedux } from '../../../store'

// const sideBarOptions: ISideBarOptions[] = [
//   {
//     menu: 'Home',
//     icon: 'home',
//     url: '/user-management/home'
//   },
//   {
//     menu: 'User management',
//     icon: 'users',
//     url: '/user-management/users'
//   },
//   {
//     menu: 'Roles management',
//     icon: 'roles',
//     url: '/user-management/roles'
//   },
//   {
//     menu: 'Logs',
//     icon: 'logs',
//     url: '/user-management/logs'
//   },
//   {
//     menu: 'Cat management',
//     icon: 'cats',
//     url: '/user-management/cat'
//   }
// ]

export const SideBar = () => {
  const { user, options } = useSelector((state: IStoreRedux) => state.auth);

  const [state, setState] = useState({
    left: false
  });

  const toggleDrawer = (open: boolean) => () => {
    setState({ left: open })
  }

  const listSideBar = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Button
        onClick={() => setState({ left: false })}
        sx={{
          marginLeft: '190px',
          color: '#3F53FE'
        }}
      >
        <EastIcon sx={{ width: '26px', height: '26px' }} />
      </Button>
      <Box
        sx={{
          width: 250,
          height: 135,
          display: 'flex'
        }}
      >
        <div style={{ paddingTop: '10px', paddingLeft: '10px' }}>
          <AccountCircleIcon
            sx={{
              width: 115,
              height: 115,
            }}
          />
        </div>

        <div
          style={{
            paddingTop: '10px',
            width: '115px',
            fontSize: '13px',
          }}
        >
          <div style={{ height: '85px' }}>
            <p>{typeof user.profile === 'undefined' ? `${user.email}` : `${user.profile.firstName} ${user.profile.lastName}`}</p>
          </div>
          <div>
            <p>{typeof user.role === 'undefined' || user.role.length === 0 ? '---' : `${user.role[0].roleName}`}</p>
          </div>
        </div>
      </Box>
      <List>
        {
          options.map((opt) => (
            <ListItem key={opt.icon} disablePadding>
              <Link
                to={opt.url}
                style={{
                  textDecoration: 'none',
                  color: 'gray',
                  width: '250px'
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    {
                      opt.icon === 'home' ? <HomeIcon /> :
                      opt.icon === 'users' ? <PersonIcon /> :
                      opt.icon === 'roles' ? <GroupsIcon /> :
                      opt.icon === 'logs' ? <ArticleIcon /> :
                      opt.icon === 'cats' ? <PetsIcon /> :
                      <QuestionMarkIcon />
                    }
                  </ListItemIcon>
                  <ListItemText primary={opt.menu} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))
        }
      </List>
    </Box>
  )

  return (
    <>
      <MenuOpenIcon
        sx={{ color: 'white' }}
        onClick={toggleDrawer(true)}
      />
      <Drawer
        anchor={'left'}
        open={state['left']}
        onClose={toggleDrawer(false)}
      >
        {listSideBar()}
      </Drawer>
    </>
  )
}
