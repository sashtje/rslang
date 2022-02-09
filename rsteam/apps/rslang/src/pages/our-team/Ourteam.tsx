import React from 'react';
import Footer from '../../components/UI/footer/Footer';

const Ourteam = () => {
  return (
    <div className='container-wrapper'>
      <main className='our-team main'>
        <div className='container-inner'>
          <h1 className='our-team__title'>Наша команда</h1>

          <div className='our-team__members-block'>
            <div className='our-team__member our-team-member our-team-member_is_first-member'>
              <div className='our-team-member__photo'>
                <img src="./assets/img/avatars/Stas.jfif" alt="Inv1nc1ble pic" />
              </div>
              <h2 className='our-team-member__name'>Стас</h2>
              <p className='our-team-member__subtitle'>Junior Developer</p>
              <a href='https://github.com/Inv1nc1ble' target='_blank' className='our-team-member__github' title='Inv1nc1ble github'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg>
              </a>
              <p className='our-team-member__about'>Max founded our company. He is the father of our main goals and values. He found the core members of our team and helped them to show their unique talents in the work process.</p>
            </div>

            <div className='our-team__member our-team-member our-team-member_is_second-member'>
              <div className='our-team-member__photo our-team-member__photo_is_second-member'>
                <img src="./assets/img/avatars/Sashtje.jpg" alt="sashtje pic" />
              </div>
              <h2 className='our-team-member__name'>Саша</h2>
              <p className='our-team-member__subtitle'>Junior Developer</p>
              <a href='https://github.com/sashtje' target='_blank' className='our-team-member__github' title='Sashtje github'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg>
              </a>
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