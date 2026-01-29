import {
  IconLogout,
  IconSwitchHorizontal,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Code, Group } from '@mantine/core';
import classes from './DrPanelSidebar.module.css';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function DrPanelSideBar({data, panelType, image}) {
  const navigate = useNavigate();
  const handleLogout = ()=>{
      localStorage.removeItem("token")
      toast.success("Logout Successfull")
      navigate('/login')
    }
  const links = data.map((item) => (
    <NavLink
    to={item.link}
    key={item.label}
    end={item.link === ''}
    className={({ isActive }) =>
      `${classes.link} ${isActive ? classes.active : ''}`
    }
  >
    <item.icon className={classes.linkIcon} stroke={1.5} />
    <span>{item.label}</span>
  </NavLink>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header}>
          <img src={`/Assets/${image}`} width="30px" alt="" />
          <h3 style={{color:"rgb(37, 37, 37)"}}>{panelType}</h3>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <div className={classes.link} onClick={()=>navigate('/')}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span >Main Website</span>
        </div>

        <div onClick={handleLogout} className={classes.link} >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </div>
      </div>
    </nav>
  );
}