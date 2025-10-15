import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Myprofile from './pages/Myprofile'
import MyAppointment from './pages/MyAppointment'
import Appointments from './pages/Appointments'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Doctors from './pages/Doctors'
import { ToastContainer, toast } from 'react-toastify';


function App() {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/doctors" element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/myprofile' element={<Myprofile/>}/>
        <Route path='/myappointment' element={<MyAppointment/>}/>
        <Route path='/appointment/:docid' element={<Appointments/>}/>


      </Routes>
      <Footer/>
    </div>
  )
}

export default App
