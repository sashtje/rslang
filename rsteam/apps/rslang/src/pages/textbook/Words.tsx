import React from 'react';
import Footer from '../../components/UI/footer/Footer';
import Groups from '../../components/UI/groups/Groups';
import { Link } from 'react-router-dom';
import Pagination from '../../components/UI/pagination/Pagination';

const Words = () => {
  return (
    <div className='container-wrapper'>
      <main className='words main words_is_a1 words_is_learned'>
        <div className='container-inner'>
          <div className='words__container'>
            <div className='words__games'>
              <Link className='words__game-link words__game-link_is_audiocall words__game-link_is_disabled' to='/audiocall'>Аудиовызов</Link>
              <Link className='words__game-link words__game-link_is_savannah' to='/savannah'>Саванна</Link>
            </div>
            <Groups />

            <div className='words__words-block'>
              <div className='words__word word-card'>
                <div className='word-card__picture'></div>

                <div className='word-card__desc'>
                  <div className='word-card__title-block'>
                    <h2 className='word-card__title'>Enjoy</h2>
                    <span className='word-card__transcript'>[kǽmərə]</span>
                    <button className='word-card__btn-sound'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                      </svg>
                    </button>
                  </div>
                  <div className='word-card__title-translate'>Наслаждаться</div>

                  <p className='word-card__def'>To enjoy is to like something.</p>
                  <p className='word-card__def-translate'>Наслаждаться значит любить что-то</p>

                  <p className='word-card__example'>The woman enjoys riding her bicycle.</p>
                  <p className='word-card__example-translate'>Женщина любит кататься на велосипеде</p>

                  <div className='word-card__controls'>
                    <button className='word-card__btn-hard'>Добавить к сложным</button>
                    <button className='word-card__btn-learned'>Добавить к изученным</button>
                  </div>
                </div>
              </div>

              <div className='words__word word-card word-card_is_hard'>
                <div className='word-card__picture'></div>

                <div className='word-card__desc'>
                  <div className='word-card__title-block'>
                    <h2 className='word-card__title'>Enjoy</h2>
                    <span className='word-card__transcript'>[kǽmərə]</span>
                    <button className='word-card__btn-sound'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                      </svg>
                    </button>
                  </div>
                  <div className='word-card__title-translate'>Камера</div>

                  <p className='word-card__def'>To enjoy is to like something.</p>
                  <p className='word-card__def-translate'>Наслаждаться значит любить что-то</p>

                  <p className='word-card__example'>The woman enjoys riding her bicycle.</p>
                  <p className='word-card__example-translate'>Женщина любит кататься на велосипеде</p>

                  <div className='word-card__controls'>
                    <button className='word-card__btn-hard'>Добавить к сложным</button>
                    <button className='word-card__btn-learned'>Добавить к изученным</button>
                  </div>
                </div>
              </div>

              <div className='words__word word-card word-card_is_learned'>
                <div className='word-card__picture'></div>

                <div className='word-card__desc'>
                  <div className='word-card__title-block'>
                    <h2 className='word-card__title'>Enjoy</h2>
                    <span className='word-card__transcript'>[kǽmərə]</span>
                    <button className='word-card__btn-sound'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                      </svg>
                    </button>
                  </div>
                  <div className='word-card__title-translate'>Камера</div>

                  <p className='word-card__def'>To enjoy is to like something.</p>
                  <p className='word-card__def-translate'>Наслаждаться значит любить что-то</p>

                  <p className='word-card__example'>The woman enjoys riding her bicycle.</p>
                  <p className='word-card__example-translate'>Женщина любит кататься на велосипеде</p>

                  <div className='word-card__controls'>
                    <button className='word-card__btn-hard'>Добавить к сложным</button>
                    <button className='word-card__btn-learned'>Добавить к изученным</button>
                  </div>
                </div>
              </div>
            </div>

            <Pagination />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Words;