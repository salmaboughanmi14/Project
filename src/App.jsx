import './App.css'
import { Routes, Route } from 'react-router-dom';
import Navbar from'../src/components/Navbar';
import Home from'../src/pages/Home';
import Register from'../src/pages/Register';
import Login from'../src/pages/Login';
import axios from 'axios';
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from '../../backend/context/userContext';
import Dashboard from '../src/pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';

axios.defaults.baseURL ='http://localhost:8000';
axios.defaults.withCredentials = true; 

function App() {
   return (
    <UserContextProvider>
      <Navbar/>
      <Toaster position='bottom-right' toastOptions={{duration: 2000}}/>
      <Routes>
      <Route path ='/' element ={<Home/>}/>
      <Route path ='/register' element ={<Register/>}/>
      <Route path ='/login' element ={<Login/>}/>
      <Route path ='/dashboard' element ={<Dashboard/>}/>
      <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App
