import React, { useContext } from 'react';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // ✅ required for toast styling
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorList from './pages/Admin/DoctorList';
import { DoctorContext } from './context/DoctorContext';
import Doctordashboard from './pages/Doctor/Doctordashboard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import Doctorprofile from './pages/Doctor/Doctorprofile';

const App = () => {
  const { atoken } = useContext(AdminContext);
  const {dtoken} = useContext(DoctorContext)
  

  return atoken || dtoken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar/>
      <div className='flex items-start'>
        <SideBar/>
        <Routes>
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/all-appointments' element={<AllAppointments/>}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
          <Route path='/doctor-list' element={<DoctorList/>}/>
          

          {/* Doctor Route */}
          <Route path='/doctor-dashboard' element={<Doctordashboard/>}/>
          <Route path='/doctor-appointments' element={<DoctorAppointment/>}/>
          <Route path='/doctor-profile' element={<Doctorprofile/>}/>

        </Routes>
      </div>
      
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
