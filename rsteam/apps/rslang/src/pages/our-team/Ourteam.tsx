import React from 'react';
import Footer from '../../components/UI/footer/Footer';

const Ourteam = () => {
  return (
    <div className='container-wrapper'>
      <main className='our-team main'>
        <div className='container-inner'>
          <h1 className='our-team__title'>Наша команда</h1>

          <div className='our-team__members-block'>
            <div className='our-team__member our-team-member'>
              <div className='our-team-member__photo'>
                <img src="./assets/img/avatars/Stas.jfif" alt="Inv1nc1ble pic" />
              </div>
              <h2 className='our-team-member__name'>Стас</h2>
              <p className='our-team-member__subtitle'>Junior Developer</p>
              <p className='our-team-member__about'>Max founded our company. He is the father of our main goals and values. He found the core members of our team and helped them to show their unique talents in the work process.</p>
            </div>

            <div className='our-team__member our-team-member'>
              <div className='our-team-member__photo'>
                <img src="./assets/img/avatars/Sashtje.jpg" alt="sashtje pic" />
              </div>
              <h2 className='our-team-member__name'>Саша</h2>
              <p className='our-team-member__subtitle'>Junior Developer</p>
              <p className='our-team-member__about'>Max founded our company. He is the father of our main goals and values. He found the core members of our team and helped them to show their unique talents in the work process.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Ourteam;