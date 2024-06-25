import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Homepage from './scenes/homePage/Homepage';
import LoginPage from './scenes/loginPage/LoginPage';
import ProfilePage from './scenes/profilePage/ProfilePage';
import { useSelector } from 'react-redux';

function App() {
  const isAuth = Boolean(useSelector((state) => state.token))
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>}></Route>
          <Route path="/home" element={isAuth? <Homepage/> : <Navigate to="/"/>}></Route>
          <Route path="/profile/:userId" element={isAuth? <ProfilePage/> : <Navigate to="/"/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
