import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

//pages
import SignIn from './pages/SignIn'
function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
