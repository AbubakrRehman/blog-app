import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import SignUp from './components/SignUp/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogIn from './components/LogIn/LogIn';
import { AuthProvider } from './components/context/AuthProvider';
import { BrowserRouter,Routes ,Route} from "react-router-dom";
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Admin from './components/Admin/Admin';

function App() {
  return (
    <div className="App">
      {/* <Header/> */}
      {/* <SignUp/> */}
    
        <AuthProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/admin" element={<Admin/>}/>
          </Routes>
          </BrowserRouter>
        </AuthProvider>
      
    </div>
  );
}

export default App;
