// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import {BrowserRouter} from 'react-router-dom';
import Navbar from '../components/UI/navbar/Navbar';
import AppRouter from '../components/AppRouter';
import { AuthContext } from '../context/index';
import { useEffect, useState } from 'react';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuth(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
    }}>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
