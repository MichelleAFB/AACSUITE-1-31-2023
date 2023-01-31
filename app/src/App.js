import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'


/**********pages********************/
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn';
//admin
import UI from './pages/AdminUI/UI';
function App() {
  return (
    <div >
    
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/admin-home" element={<UI/>}/>
        
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
