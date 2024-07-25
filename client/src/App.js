import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Homepage from './scenes/homePage/Homepage';
import LoginPage from './scenes/loginPage/LoginPage';
import ProfilePage from './scenes/profilePage/ProfilePage';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { themeSettings } from './theme';

function App() {
  const isAuth = Boolean(useSelector((state) => state.token))
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage/>}></Route>
            <Route path="/home" element={isAuth? <Homepage/> : <Navigate to="/"/>}></Route>
            <Route path="/profile/:userId" element={isAuth? <ProfilePage/> : <Navigate to="/"/>}></Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
