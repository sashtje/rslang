import React from 'react';
import Footer from '../../components/UI/footer/Footer';
import Groups from '../../components/UI/groups/Groups';
import { Link } from 'react-router-dom';
import Pagination from '../../components/UI/pagination/Pagination';

const Words = () => {
  return (
    <div className='container-wrapper'>
      <main className='words main'>
        <div className='container-inner words__container'>
          <div className='words__games'>
            <Link className='words__game-link words__game-link_is_audiocall words__game-link_is_disabled' to='/audiocall'>Аудиовызов</Link>
            <Link className='words__game-link words__game-link_is_savannah' to='/savannah'>Саванна</Link>
          </div>
          <Groups />

          <Pagination />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Words;