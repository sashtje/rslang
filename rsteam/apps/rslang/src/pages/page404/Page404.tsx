import React from 'react';
import Footer from '../../components/UI/footer/Footer';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div className='container-wrapper'>
      <main className='page404 main'>
        <div className='container-inner page404__container'>
          <Link className='page404__link' to='/'>Вернуться на главную</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page404;