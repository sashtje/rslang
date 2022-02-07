import React from 'react';
import Footer from '../../components/UI/footer/Footer';
import './Home.scss';

const Home = () => {
  return (
    <div className='container-wrapper'>
      <main className='home'>
        <h1>RSLang</h1>
      </main>
      <Footer />
    </div>
  );
};

export default Home;