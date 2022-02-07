import React from 'react';
import Footer from '../../components/UI/footer/Footer';
import './Home.scss';

const Home = () => {
  return (
    <div className='container-wrapper'>
      <main className='home'>
        <div className='container-inner'>
          <h1>RSLang</h1>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;