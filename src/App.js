import logo from './logo.svg';
import './App.css';
import LoginPatient from './pages/LoginPatient';
import RegistrationPatient from './pages/RegisterPatient';
import RegistrationDoctor from './pages/RegisterDoctor';
import LoginDoctor from './pages/LoginDoctor';
import DashboardPatient from './pages/DashboardPatient';
import DashboardDoctor from './pages/DashboardDoctor';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/patient-register' element={<RegistrationPatient />}></Route>
      <Route path='/patient-login' element={<LoginPatient />}></Route>
      <Route path='/doctor-register' element={<RegistrationDoctor />}></Route>
      <Route path='/doctor-login' element={<LoginDoctor />}></Route>
      <Route path='/patient-dashboard' element={<DashboardPatient />}></Route>
      <Route path='/doctor-dashboard' element={<DashboardDoctor />}></Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
