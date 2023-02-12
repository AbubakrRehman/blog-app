import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import SignUp from './components/SignUp/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogIn from './components/LogIn/LogIn';
import { AuthProvider } from './components/context/AuthProvider';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Admin from './components/Admin/Admin';
import BlogItem from './components/BlogItem/BlogItem';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <div className="App">
      {/* <Header/> */}
      {/* <SignUp/> */}

      <AuthProvider>
        <BrowserRouter>
        <Header/>
          <Routes>
            {/* public routes */}
             <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} /> 
            
            <Route path="/" element={<Home />} />
            <Route path="/:blogId" element={<BlogItem />} />
           


            {/* private routes */}
             <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} /> 
            <Route path="/profile" element={<Profile />} /> 
          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </div>
  );
}

export default App;
