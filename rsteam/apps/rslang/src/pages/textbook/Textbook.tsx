import React from 'react';
import Footer from '../../components/UI/footer/Footer';
import { Link } from 'react-router-dom';

const Textbook = () => {
  return (
    <div className='container-wrapper'>
      <main className='textbook main'>
        <div className='container-inner textbook__container'>
          <h1 className='textbook__title'>Учебник</h1>

          <div className='textbook__row'>
            <div className='textbook__content-block'>
              <p className='textbook__desc'>Учебник содержит 3600 часто употребляемых слов. Слова отсортированы от более простых и известных (раздел A1) к более сложным (раздел С2).</p>
              <p className='textbook__desc'>Всего 6 разделов, в каждом разделе 30 страниц со словами для изучения.</p>

              <p className='textbook__desc'>Также для авторизованных пользователей есть возможность добавлять слова в седьмой раздел. Слова этого раздела требуют более тщательного повторения и запоминания.</p>
            </div>

            <div className='textbook__picture-block'></div>
          </div>

          <div className='textbook__groups'>
            <Link className='textbook__group-link textbook__group-link_is_a1' to='/textbook/a1/1'>A1</Link>
            <Link className='textbook__group-link textbook__group-link_is_a2' to='/textbook/a2/1'>A2</Link>
            <Link className='textbook__group-link textbook__group-link_is_b1' to='/textbook/b1/1'>B1</Link>
            <Link className='textbook__group-link textbook__group-link_is_b2' to='/textbook/b2/1'>B2</Link>
            <Link className='textbook__group-link textbook__group-link_is_c1' to='/textbook/c1/1'>C1</Link>
            <Link className='textbook__group-link textbook__group-link_is_c2' to='/textbook/c2/1'>C2</Link>
            <Link className='textbook__group-link textbook__group-link_is_hard' to='/textbook/hard/1'>&#9733;</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Textbook;