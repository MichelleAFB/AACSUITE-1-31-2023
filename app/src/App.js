import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'


/**********pages********************/
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn';
//admin
import UI from './pages/AdminUI/UI';
import ReservationsPage from './pages/AdminUI/ReservationsPage'
import EventsPage from './pages/AdminUI/EventsPage';
import CompanyHome from './pages/CompanyUI/CompanyHome';

function App() {
  return (
    <div >
    
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/admin-home" element={<UI/>}/>
        <Route path="/admin-reservations" element={<ReservationsPage/>}/>
        <Route path="/admin-events" element={<EventsPage/>}/>
        <Route path="/employee-home" element={<CompanyHome/>}/>
        
        
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
