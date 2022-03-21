import React, { useEffect, useState, useContext } from 'react';
import Footer from '../../components/UI/footer/Footer';
import Groups from '../../components/UI/groups/Groups';
import { Link } from 'react-router-dom';
import Pagination from '../../components/UI/pagination/Pagination';
import WordCard from '../../components/WordCard';
import Loader from '../../components/UI/loader/Loader';
import axios from 'axios';
import { AuthContext } from '../../context/index';
import { getSafeInfoAboutWords, getSafeHardWords, getSafeInfoAboutAllPages } from '../../fetch/fetch';
import { getDefaultStat } from '../../fetch/stats';
import {getSafeGeneralStat} from '../../fetch/fetch';
import { GameContext } from '../../context/index';

const Words = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);
  const {gameSet, setGameSet} = useContext(GameContext);

  const [group, setGroup] = useState(null);
  const [page, setPage] = useState(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [words, setWords] = useState([]);
  const [isArrMusic, setIsArrMusic] = useState([]);

  const [wordsUser, setWordsUser] = useState([]);
  const [wordsPagPerPage, setWordsPagPerPage] = useState([]);
  const date = new Date();
  const [stat, setStat] = useState(getDefaultStat(date));

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

      case 'hard':
        numberGroup = '6';
        break;
    }

    return numberGroup;
  };

  const fetchWords = async () => {
    let data = [];

    try {
      const response = await axios({
        url: `https://react-learnwords-rs.herokuapp.com/words?group=${getNumberGroup()}&page=${page - 1}`,
        headers: { "accept": "application/json"}
      });
      data = await response.data;
      setWords(data);
    } catch (error) {
      setWords([]);
      return;
    }

    if (isAuth || localStorage.getItem('token')) {
      //download all info about words and pagination
      const userWords = await getSafeInfoAboutWords(data);
      if (userWords === "error") {
        setIsAuth(false);
        localStorage.clear();
        return;
      }
      setWordsUser(userWords as any[]);
      const pagWords = await getSafeInfoAboutAllPages(getNumberGroup());
      if (pagWords === "error") {
        setIsAuth(false);
        localStorage.clear();
        return;
      }
      setWordsPagPerPage(pagWords as any[]);
    }
  };

  const fetchHardWords = async () => {
    //download all info about words
    let words = await getSafeHardWords();
    if (words === "error") {
      setIsAuth(false);
      localStorage.clear();
      return;
    }

    //сортировать слова
    words.sort((a, b) => {
      if (a.word.toLowerCase() >= b.word.toLowerCase()) {
        return 1;
      }
      return -1;
    });

    words = words.map((word) => {
      word.id = word._id;
      delete word._id;
      return word;
    });

    setWords(words);

    const userWords = await getSafeInfoAboutWords(words);
    if (userWords === "error") {
      setIsAuth(false);
      localStorage.clear();
      return;
    }
    setWordsUser(userWords as any[]);
  };

  const getLongStat = async () => {
    const currDate = date.toDateString();
    const st = await getSafeGeneralStat(currDate, true);

    if (st === 'error') {
      setIsAuth(false);
      localStorage.clear();
      return;
    }

    setStat(st);
  };

  useEffect(() => {
    setPageAndGroup();
    if (isAuth || localStorage.getItem('token')) {
      getLongStat();
    }
  }, []);

  const changeWordsData = async (group, page) => {
    setIsLoaded(true);

    if (group !== 'hard') {
      await fetchWords();
    } else {
      await fetchHardWords();
    }

    setIsLoaded(false);
  };

  useEffect(() => {
    const isArrMusic = [];

    for (let i = 0; i < words.length; i++) {
      isArrMusic.push(false);
    }
    setIsArrMusic(isArrMusic);
  }, [words]);

  useEffect(() => {
    if (group) {
      changeWordsData(group, page);
    }
  }, [group, page]);

  const onClickGame = () => {
    const numGroup = +getNumberGroup();
    let numPage;
    if (numGroup === 6) {
      numPage = null;
    } else numPage = page - 1;

    const gameFromTxb = {
      isTxb: true,
      group: numGroup,
      page: numPage
    };

    setGameSet(gameFromTxb);
  };

  return (
    <div className='container-wrapper'>
      <main className={`words main words_is_${group}${(wordsPagPerPage[page - 1] === 20) && !isLoaded ? ' words_is_learned' : ''}`}>
        <div className='container-inner'>
          <div className='words__container'>
            <div className='words__games'>
              <Link className='words__game-link words__game-link_is_audiocall' to='/audiocall' onClick={onClickGame}>Аудиовызов</Link>
              <Link className='words__game-link words__game-link_is_savannah' to='/sprint' onClick={onClickGame}>Спринт</Link>
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
                  {words.map((word, ind) =>
                    <WordCard key={word.id} word={word} isArrMusic={isArrMusic} setIsArrMusic={setIsArrMusic} ind={ind} group={group} page={page} wordsPagPerPage={wordsPagPerPage} setWordsPagPerPage={setWordsPagPerPage} stat={stat} setStat={setStat} words={words} setWords={setWords} wordsUser={wordsUser} setWordsUser={setWordsUser} />
                  )}
                </div>
            }
            

            <Pagination page={page} group={group} setPage={setPage} wordsPagPerPage={wordsPagPerPage} isLoaded={isLoaded}/>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Words;