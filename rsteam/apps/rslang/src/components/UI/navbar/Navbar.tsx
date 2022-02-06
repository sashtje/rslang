import React from 'react';
import {Link} from 'react-router-dom';
import cl from './Navbar.module.css';

const Navbar = () => {
  return (
    <div className={cl['navbar']}>
      <Link to='/'>Home</Link>
      <Link to='/our-team'>Our team</Link>
      <Link to='/textbook'>Textbook</Link>
      <Link to='/savannah'>Savannah</Link>
      <Link to='/audiocall'>Audiocall</Link>
      <Link to='/statistics'>Statistics</Link>
    </div>
  );
};

export default Navbar;