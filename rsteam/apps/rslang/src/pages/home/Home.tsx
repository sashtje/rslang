import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/UI/footer/Footer';

const Home = () => {
  return (
    <div className='container-wrapper'>
      <main className='home main'>
        <div className='container-inner'>
          <div className='home__intro-block'>
            <section className='home__intro home-intro'>
              <h1 className='home-intro__title'>
                Онлайн сервис английского языка с нуля
              </h1>
              <p className='home-intro__subtitle'>Разговорный английский. Интенсивная программа: от Elementary до Upper-Intermediate за 12 месяцев</p>
              <div className='home-intro__controls'>
                <Link className='btn' to='/login'>Записаться</Link>
                <a className='btn btn_is_about' href="#home-features">Подробнее</a>
              </div>
            </section>

            <div className='home__intro-picture'>
              <div className='home__intro-picture-container'></div>
            </div>
          </div>

          <section className='home__features home-features' id='home-features'>
            <h2 className='home-features__title'>Преимущества платформы</h2>
            <p className='home-features__subtitle'>Уникальная интерактивная платформа позволит изучать язык в игровой форме, выбирать план обучения и отслеживать результаты</p>

            <div className='home-features__cards'>
              <div className='home-card'>
                <div className='home-card__icon'>
                  <img src="./../../assets/svg/home-page/textbook.svg" alt="" />
                </div>
                <h3 className='home-card__title'>Учебник</h3>
                <div className='home-card__description'>Более 3500 тысячи слов для изучения, разбиты на разделы по уровню твоей подготовки с удобной навигацией</div>
              </div>

              <div className='home-card'>
                <div className='home-card__icon'>
                  <img src="./../../assets/svg/home-page/dictionary.svg" alt="" />
                </div>
                <h3 className='home-card__title'>Словарь</h3>
                <div className='home-card__description'>Более 3500 тысячи слов для изучения, разбиты на разделы по уровню твоей подготовки с удобной навигацией</div>
              </div>

              <div className='home-card'>
                <div className='home-card__icon'>
                  <img src="./../../assets/svg/home-page/statistics.svg" alt="" />
                </div>
                <h3 className='home-card__title'>Статистика</h3>
                <div className='home-card__description'>Более 3500 тысячи слов для изучения, разбиты на разделы по уровню твоей подготовки с удобной навигацией</div>
              </div>

              <div className='home-card'>
                <div className='home-card__icon'>
                  <img src="./../../assets/svg/home-page/games.svg" alt="" />
                </div>
                <h3 className='home-card__title'>Игры</h3>
                <div className='home-card__description'>Более 3500 тысячи слов для изучения, разбиты на разделы по уровню твоей подготовки с удобной навигацией</div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;