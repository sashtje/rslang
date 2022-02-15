import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Groups = () => {
  const isActive = (group) => {
    return window.location.pathname.includes(group);
  };

  const getClasses = (group) => {
    if (isActive(group)) {
      return `textbook__group-link textbook__group-link_is_${group} textbook__group-link_is_active`;
    }
    return `textbook__group-link textbook__group-link_is_${group}`;
  };

  return (
    <div className='textbook__groups'>
      <Link className={getClasses('a1')}
      to='/textbook/a1/1'>A1</Link>
      <Link className={getClasses('a2')} to='/textbook/a2/1'>A2</Link>
      <Link className={getClasses('b1')} to='/textbook/b1/1'>B1</Link>
      <Link className={getClasses('b2')} to='/textbook/b2/1'>B2</Link>
      <Link className={getClasses('c1')} to='/textbook/c1/1'>C1</Link>
      <Link className={getClasses('c2')} to='/textbook/c2/1'>C2</Link>
      <Link className={getClasses('hard')} to='/textbook/hard'>&#9733;</Link>
    </div>
  );
};

export default Groups;