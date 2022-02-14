import React from 'react';
import Footer from '../../components/UI/footer/Footer';
import Groups from '../../components/UI/groups/Groups';

const Words = () => {
  return (
    <div className='container-wrapper'>
      <main className='words main'>
        <div className='container-inner words__container'>
          <Groups />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Words;