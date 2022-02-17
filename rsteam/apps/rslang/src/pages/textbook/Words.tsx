import React, { useEffect, useState } from 'react';
import Footer from '../../components/UI/footer/Footer';
import Groups from '../../components/UI/groups/Groups';
import { Link } from 'react-router-dom';
import Pagination from '../../components/UI/pagination/Pagination';
import WordCard from '../../components/WordCard';
import Loader from '../../components/UI/loader/Loader';
import axios from 'axios';

const Words = () => {
  const [group, setGroup] = useState(null);
  const [page, setPage] = useState(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [words, setWords] = useState([]);

  const setPageAndGroup = () => {
    const path = window.location.pathname;

    if (path.includes('hard')) {
      setGroup('hard');
      setPage(null);
    } else {
      const page = +path.split('/').slice(-1)[0];
      const group = path.split('/').slice(-2)[0];
      setGroup(group);
      setPage(page);
    }
  };

  const getNumberGroup = () => {
    let numberGroup = '';

    switch (group) {
      case 'a1':
        numberGroup = '0';
        break;
      
      case 'a2':
        numberGroup = '1';
        break;

      case 'b1':
        numberGroup = '2';
        break;

      case 'b2':
        numberGroup = '3';
        break;

      case 'c1':
        numberGroup = '4';
        break;

      case 'c2':
        numberGroup = '5';
        break;
    }

    return numberGroup;
  };

  const fetchWords = async () => {
    setIsLoaded(true);

    try {
      const response = await axios({
        url: `https://react-learnwords-rs.herokuapp.com/words?group=${getNumberGroup()}&page=${page - 1}`,
        headers: { "accept": "application/json"}
      });
      const data = await response.data;
      setWords(data);
    } catch (error) {
      setWords([]);
    } finally {
      setIsLoaded(false);
    }
  };

  useEffect(() => {
    setPageAndGroup();
  }, []);

  useEffect(() => {
    if (group) {
      fetchWords();
    }
  }, [group, page]);

  return (
    <div className='container-wrapper'>
      <main className={`words main words_is_${group}`}>
         {/* words_is_learned */}
        <div className='container-inner'>
          <div className='words__container'>
            <div className='words__games'>
              <Link className='words__game-link words__game-link_is_audiocall' to='/audiocall'>Аудиовызов</Link>
              <Link className='words__game-link words__game-link_is_savannah' to='/sprint'>Спринт</Link>
            </div>

            <Groups setPage={setPage} setGroup={setGroup} />

            {
              isLoaded
              ? <div className='words__loader'>
                  <Loader />
                </div>
              : <div
                  className='words__words-block'
                >
                  {words.map((word) =>
                    <WordCard key={word.id} word={word} />
                  )}
                </div>
            }
            

            <Pagination page={page} group={group} setPage={setPage} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Words;