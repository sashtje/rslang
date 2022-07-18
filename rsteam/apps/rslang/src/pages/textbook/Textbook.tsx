import React from 'react';
import Footer from '../../components/UI/footer/Footer';
import Groups from '../../components/UI/groups/Groups';

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

          <Groups setPage={(page) => {}} setGroup={(group) => {}}/>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Textbook;