import React,{ useEffect, useState } from 'react'
import {
  Icon2fa,
  IconBellRinging,
  IconDatabaseImport,
  IconFingerprint,
  IconKey,
  IconLogout,
  IconReceipt2,
  IconSettings,
  IconSwitchHorizontal,
} from '@tabler/icons-react';
import styles from './AdminPanel.module.css'
import DrPanelSideBar from '../../Components/DoctorPanelSideBar/DrPanelSideBar'
import Footer from '../../Components/Footer/Footer'
import { Burger } from '@mantine/core'
import { Outlet } from 'react-router-dom';
import { socket } from "../../../socket";
import { toast } from 'react-toastify';

const AdminPanel = () => {


  useEffect(() => {
  socket.emit("join-admin");

  socket.on("new-appointment-admin", (data) => {
    toast.info(data.message);
  });

  return () => socket.off("new-appointment-admin");
}, []);

    const [opened, setOpened] = useState(false)
    const data = [
      { link: '', label: 'Dashboard', icon: IconBellRinging },
      { link: 'all-appointment', label: 'All Appointment', icon: IconReceipt2 },
      { link: 'doctor-management', label: 'Manage Doctors', icon: IconFingerprint },
      { link: 'payment', label: 'Payment', icon: IconKey },
      { link: 'schedule', label: 'Schedule', icon: IconDatabaseImport },
      { link: 'manage-offer', label: 'Manage Offers', icon: Icon2fa },
      { link: 'other-setting', label: 'Other Settings', icon: IconSettings },
    ];
  return (
    <>
      <div className={styles.mobileNavbar}>
        <Burger opened={opened} onClick={() => setOpened(!opened)} />
        <span className={styles.title}>Admin Panel</span>
      </div>
    <div className={styles.drPanelPage}>
      <div className={`${styles.sidebar} ${opened ? styles.open : ''}`}>
           <DrPanelSideBar data={data} panelType="Admin Panel" image="admin-panel.jpg" closeSidebar={() => setOpened(false)} ></DrPanelSideBar>
      </div>
      {opened && <div className={styles.overlay} onClick={() => setOpened(false)} />}
      <div className={styles.adminPart2}>
             {/* <TableSelection></TableSelection> */}
             {/* <AdminPanelDrManage></AdminPanelDrManage> */}
             <Outlet/>
      </div>
    </div>
    <Footer></Footer>
    </>
  )
}

export default AdminPanel