import logo from './logo.svg';
import './App.css';
import LoginPatient from './pages/LoginPatient';
import RegistrationPatient from './pages/RegisterPatient';
import RegistrationDoctor from './pages/RegisterDoctor';
import LoginDoctor from './pages/LoginDoctor';
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


      </Routes>
    </BrowserRouter>
  );
}

export default App;
