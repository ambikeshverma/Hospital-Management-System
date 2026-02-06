import * as React from 'react';
import styles from './Navbar.module.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button, Loader } from '@mantine/core';
import { Table } from '@mantine/core';
import { toast } from 'react-toastify';
import axios from 'axios';
import AppointmentCard from '../AppointmentInfo/AppointmentCard';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false)
  const [appointment, setAppointment] = React.useState([])
  const [opened, { open, close }] = useDisclosure(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const headers = {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}

  const handleLogout = ()=>{
    localStorage.removeItem("token")
    toast.success("Logout Successfull")
    navigate('/login')
  }

  const formatToIndianDateTime = (dateString) => {
  const date = new Date(dateString);

  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

  const handleAppoitment = async()=>{
        setLoading(true)
         try{
           open()
           const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/getAppointment`,headers)
           setAppointment(res.data)
         }catch(err){
          toast.error(err.response?.data?.msg)
         }finally{
          setLoading(false)
         }
  }

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={()=>{handleLogout(),handleMenuClose()}}>Logout</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem >
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge color="error">
            <HomeIcon/>
          </Badge>
        </IconButton>
        <p onClick={()=>navigate('/')}>Home</p>
      </MenuItem>
      <MenuItem >
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge color="error">
            <InfoIcon/>
          </Badge>
        </IconButton>
        <p onClick={()=>navigate('/about')}>About Us</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge color="error">
            <ContactMailIcon/>
          </Badge>
        </IconButton>
        <p onClick={()=>navigate('/contact')}>Contact Us</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={4} color="error">
            <MedicalServicesIcon/>
          </Badge>
        </IconButton>
        <p onClick={()=>navigate('/allDoctors')}>Doctors</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" top="0px" left="0px">
        <Toolbar>
                <Drawer zIndex={2000} offset={4} radius="md" opened={opened} onClose={close} title="Booked Appointments">
                         {loading ? <Loader size={30}></Loader>: appointment.length>0 ? <> {appointment.map((element) => (
                         <AppointmentCard
                          bookedBy={element.user?.name}
                          patientName={element.ptName}
                          ptPhone={element.ptPhone}
                          ptEmail={element.ptEmail}
                          ptAge={element.ptAge}
                          ptCareOf={element.ptCareOf}
                          ptAddress={element.ptAddress}
                          alotedSlot={element.selectedSlot}
                          updatedAt={element.updatedAt}
                          dateTime={formatToIndianDateTime(element.updatedAt)}
                          doctorName={element.doctor?.name}
                          doctorDegrees={element.doctor?.doctorProfile?.degrees}
                          doctorExpertise={element.doctor?.doctorProfile?.expertise}
                          doctorIds={element.doctor?._id}
                          appointmentId={element._id}
                          status={element.currentStatus}   // pending | approved | rejected | completed | cancelled
                          closeDrawer={()=>close()}
                />
                         ))}</>:"You not booked any Appointment"}
                         
                </Drawer>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleAppoitment}
          >
            <MenuIcon/>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <div className={styles.listWrapper}>
                <NavLink to={'/'} className={({isActive})=>`${styles.link} ${isActive?styles.active:""}`}><span>Home</span></NavLink>
            </div>
            <div className={styles.listWrapper}>
                <NavLink to={'/about'} className={({isActive})=>`${styles.link} ${isActive?styles.active:""}`}><span>About</span></NavLink>
            </div>
            <div className={styles.listWrapper}>
                <NavLink to={'/contact'} className={({isActive})=>`${styles.link} ${isActive?styles.active:""}`}><span>Contact Us</span></NavLink>
            </div>
            <div className={styles.listWrapper}>
                <NavLink to={'/allDoctors'} className={({isActive})=>`${styles.link} ${isActive?styles.active:""}`}><span>Doctors</span></NavLink>
            </div>

            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}