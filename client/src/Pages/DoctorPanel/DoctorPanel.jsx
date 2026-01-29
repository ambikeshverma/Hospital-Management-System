import React,{ useState } from 'react'
import {
  Icon2fa,
  IconBellRinging,
  IconDatabaseImport,
  IconFingerprint,
  IconKey,
  IconReceipt2,
  IconSettings,
  IconSwitchHorizontal,
} from '@tabler/icons-react';
import styles from './DoctorPanel.module.css'
import DrPanelSideBar from '../../Components/DoctorPanelSideBar/DrPanelSideBar'
import PrimarySearchAppBar from '../../Components/NavBar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { Burger } from '@mantine/core'
import DoctorProfile from '../../Components/DoctorProfile/DoctorProfile'
import DrDashboard from '../../Components/DrDashboard/DrDashboard'
import { TableSelection } from '../../Components/AdminPanelTable/TableSelection'
import { Outlet } from 'react-router-dom'

const DoctorPanel = () => {
  const [opened, setOpened] = useState(false)
  const data = [
  { link: '', label: 'Dashboard', icon: IconBellRinging },
  { link: 'appointment', label: 'My Appointment', icon: IconReceipt2 },
  { link: 'profile', label: 'My Profile', icon: IconFingerprint },
  { link: 'sessions', label: 'My Sessions', icon: IconKey },
  { link: 'patients', label: 'My Patients', icon: IconDatabaseImport },
  { link: 'calender', label: 'Calender', icon: Icon2fa },
  { link: 'setting', label: 'Other Settings', icon: IconSettings },
];
  return (
    <>
          <div className={styles.mobileNavbar}>
        <Burger opened={opened} onClick={() => setOpened(!opened)} />
        <span className={styles.title}>Doctor Panel</span>
      </div>
    <div className={styles.drPanelPage}>
      <div className={`${styles.sidebar} ${opened ? styles.open : ''}`}>
           <DrPanelSideBar data={data} panelType="Doctor Panel" image="doctor-panel.png"></DrPanelSideBar>
      </div>
      {opened && <div className={styles.overlay} onClick={() => setOpened(false)} />}
      <div className={styles.dashboardPart2}>
        {/* <DrDashboard></DrDashboard> */}
           {/* <DoctorProfile></DoctorProfile> */}
           {/* <TableSelection></TableSelection> */}
           <Outlet/>
      </div>
    </div>
    <Footer></Footer>
    </>
  )
}

export default DoctorPanel