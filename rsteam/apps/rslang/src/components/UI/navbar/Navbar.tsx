import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import Burger from '../burger/Burger';
import { AuthContext } from '../../../context/index';

const Navbar = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);

  const logOut = () => {
    setIsAuth(false);

    localStorage.clear();
  };


  return (
    <header className='navbar'>
      <div className='container-inner navbar__container'>
        <Burger />

        <Link className='navbar__logo' to='/'>RsLang</Link>

        {
          isAuth
          ? <Link
              className='navbar__login'
              to='/'
              title='Log out'
              onClick={logOut}
            >
              <svg className="navbar__login-icon" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
              </svg>
            </Link>
          : <Link className='navbar__login' to='/login' title='Log in / Sign up'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" className="navbar__login-icon" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
          </Link>
        }
      </div>
    </header>
  );
};

export default Navbar;