// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import {BrowserRouter} from 'react-router-dom';
import Navbar from '../components/UI/navbar/Navbar';
import AppRouter from '../components/AppRouter';
import { AuthContext, GameContext } from '../context/index';
import { useEffect, useState } from 'react';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [gameSet, setGameSet] = useState({
    isTxb: false,
    group: null,
    page: null
  });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuth(true);
    }
  }, []);

  return (
    <GameContext.Provider value={{
      gameSet,
      setGameSet
    }}>
      <AuthContext.Provider value={{
        isAuth,
        setIsAuth
      }}>
        <BrowserRouter basename='/rslang'>
          <Navbar />
          <AppRouter />
        </BrowserRouter>
      </AuthContext.Provider>
    </GameContext.Provider>
  );
}

export default App;
