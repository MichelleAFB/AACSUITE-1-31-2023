import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'


/*****COMPONENTS */
import TopNavbar from './components/TopNavBar'
import EventModal from './components/EventModal';

/**********pages********************/
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn';
//admin
import UI from './pages/AdminUI/UI';
import ReservationsPage from './pages/AdminUI/ReservationsPage'
import EventsPage from './pages/AdminUI/EventsPage';
//employee
import EmployeeHome from './pages/CompanyUI/EmployeeHome'
//client
import ClientHome from './pages/ClientUI/ClientHome';

function App() {
  return (
    <div >
     
      <BrowserRouter>
      <TopNavbar/>
      <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/admin-home" element={<UI/>}/>
        <Route path="/employee-home" element={<EmployeeHome/>}/>
        <Route path="/admin-reservations" element={<ReservationsPage/>}/>
        <Route path="/admin-events" element={<EventsPage/>}/>
        <Route path="/client-home" element={<ClientHome/>}/>
       
       
        
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
