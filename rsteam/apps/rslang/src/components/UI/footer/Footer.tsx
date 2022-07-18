import React from 'react';
import RSSchoolImg from '../rsschool/RSSchoolImg';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container-inner footer__container'>
        <a className='footer__rsschool-link' href="https://rs.school/js/" target='_blank'>
          <RSSchoolImg />
        </a>

        <span className="footer__copyright">© <time dateTime="2022">2022</time></span>

        <div className='footer__authors'>
          <a className='footer__authors-Stas' href="https://github.com/Inv1nc1ble" target='_blank' title='Inv1nc1ble github'>
            <img src="./assets/img/avatars/Stas.jfif" alt="Go to github of Inv1nc1ble" />
          </a>
          <a className='footer__authors-Sasha' href="https://github.com/sashtje" target='_blank' title='Sashtje github'>
            <img src="./assets/img/avatars/Sashtje.jpg" alt="Go to github of Sashtje" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;