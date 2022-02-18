import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/index';

const Groups = ({setPage, setGroup}) => {
  const {isAuth} = useContext(AuthContext);

  const isActive = (group) => {
    return window.location.pathname.includes(group);
  };

  const getClasses = (group) => {
    if (isActive(group)) {
      return `textbook__group-link textbook__group-link_is_${group} textbook__group-link_is_active`;
    }
    return `textbook__group-link textbook__group-link_is_${group}`;
  };

  const changePageAndGroup = (group) => {
    if (group === 'hard') {
      setPage(null);
    } else {
      setPage(1);
    }
    setGroup(group);
  };

  return (
    <div className='textbook__groups'>
      <Link
        className={getClasses('a1')}
        to='/textbook/a1/1'
        onClick={() => changePageAndGroup('a1')}
      >A1</Link>

      <Link
        className={getClasses('a2')}
        to='/textbook/a2/1'
        onClick={() => changePageAndGroup('a2')}
      >A2</Link>

      <Link
        className={getClasses('b1')}
        to='/textbook/b1/1'
        onClick={() => changePageAndGroup('b1')}
      >B1</Link>

      <Link
        className={getClasses('b2')}
        to='/textbook/b2/1'
        onClick={() => changePageAndGroup('b2')}
      >B2</Link>

      <Link
        className={getClasses('c1')}
        to='/textbook/c1/1'
        onClick={() => changePageAndGroup('c1')}
      >C1</Link>

      <Link
        className={getClasses('c2')}
        to='/textbook/c2/1'
        onClick={() => changePageAndGroup('c2')}
      >C2</Link>
      {
        isAuth
        ? <Link
            className={getClasses('hard')}
            to='/textbook/hard'
            onClick={() => changePageAndGroup('hard')}
          >&#9733;</Link>
        : ''
      }
    </div>
  );
};

export default Groups;