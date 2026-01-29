import React from 'react'
import { ToastContainer} from 'react-toastify';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import LoginForm from './Components/LoginForm/LoginForm';
import RegistrationForm from './Components/RegistrationForm/RegistrationForm'
import Home from './Pages/HomePage/Home';
import DoctorSpecific from './Pages/DoctorSpecific/DoctorSpecific';
import DoctorPanel from './Pages/DoctorPanel/DoctorPanel';
import AdminPanel from './Pages/AdminPanel/AdminPanel';
import { Routes ,Route} from 'react-router-dom';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import DrDashboard from './Components/DrDashboard/DrDashboard';
import { TableSelection } from './Components/AdminPanelTable/TableSelection';
import DoctorProfile from './Components/DoctorProfile/DoctorProfile';
import AdminPanelDrManage from './Components/AdminPanelDrManage/AdminPanelDrManage';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import ScrollToTop from './Components/ScrollEffect/ScrollToTop';
import DrPanelTable from './Components/DrPanelTable/DrPanelTable';
import AllDoctor from './Pages/AllDoctorPage/AllDoctor';
import RoleProtectedRoutes from './Components/ProtectedRoutes/RoleProtectedRoutes';
import AdminDashboardHome from './Components/AdminPanelDashboard/AdminDashboardHome';

const App = () => {
  return (
    <MantineProvider  theme={{
    fontFamily: "Poppins, sans-serif",
  }}>
    <ScrollToTop/>
        <Routes>
          <Route path='/login' element={<LoginForm></LoginForm>}></Route>
            <Route path='/registration' element={<RegistrationForm></RegistrationForm>}></Route>
            <Route path='/' element={<ProtectedRoutes><Home/></ProtectedRoutes>}></Route>
            <Route path='/allDoctors' element={<ProtectedRoutes><AllDoctor></AllDoctor></ProtectedRoutes>}></Route>
            <Route path='/doctor/specific/:id' element={<ProtectedRoutes> <DoctorSpecific></DoctorSpecific> </ProtectedRoutes>}></Route>
            <Route element={<RoleProtectedRoutes allowedRoles={["doctor"]} />}>
                <Route path='/doctor-panel' element={<DoctorPanel></DoctorPanel>}>
                    <Route index element={<DrDashboard />} />
                    <Route path='dashboard' element={<DrDashboard></DrDashboard>}></Route>
                    <Route path='appointment' element={<DrPanelTable></DrPanelTable>}></Route>
                    <Route path='profile' element={<DoctorProfile></DoctorProfile>}></Route>
                    <Route path='sessions' element={<PageNotFound></PageNotFound>}></Route>
                    <Route path='patients' element={<PageNotFound></PageNotFound>}></Route>
                    <Route path='calender' element={<PageNotFound></PageNotFound>}></Route>
                    <Route path='setting' element={<PageNotFound></PageNotFound>}></Route>
                </Route>
            </Route>
            <Route element={<RoleProtectedRoutes allowedRoles={["admin"]} />}>
                <Route path='/admin' element={<AdminPanel></AdminPanel>}>
                    <Route index element={<AdminDashboardHome></AdminDashboardHome>}></Route>
                    <Route path='all-appointment' element={<TableSelection></TableSelection>}></Route>
                    <Route path='doctor-management' element={<AdminPanelDrManage></AdminPanelDrManage>}></Route>
                    <Route path="payment" element={<PageNotFound></PageNotFound>}></Route>
                    <Route path='schedule' element={<PageNotFound></PageNotFound>}></Route>
                    <Route path='manage-offer' element={<PageNotFound></PageNotFound>}></Route>
                    <Route path='other-setting' element={<PageNotFound></PageNotFound>}></Route>
                </Route>
            </Route>
        </Routes>
      <ToastContainer />
    </MantineProvider>
  )
}

export default App