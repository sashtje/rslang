import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/index';
import {updateSafeWordData, putGeneralStat, createSafeWordData} from '../fetch/fetch';
import {getDefaultGames, getDefaultAll} from '../fetch/stats';

const WordCard = (
  {word, isArrMusic, setIsArrMusic, ind, group, page, wordsPagPerPage, setWordsPagPerPage, stat, setStat, words, setWords, wordsUser, setWordsUser }
) => {
  const basePath = 'https://react-learnwords-rs.herokuapp.com/';
  const {isAuth, setIsAuth} = useContext(AuthContext);

  const [audio] = useState(new Audio(`${basePath}${word.audio}`));
  const [audioMeaning] = useState(new Audio(`${basePath}${word.audioMeaning}`));
  const [audioExample] = useState(new Audio(`${basePath}${word.audioExample}`));

  const [numRA, setNumRA] = useState(0);
  const [numWA, setNumWA] = useState(0);
  const [lastAnsw, setLastAnsw] = useState([]);

  const [isBlockBtns, setIsBlockBtns] = useState(false);

  const turnOffMusic = () => {
    if (audio.played) {
      audio.pause();
    }
    if (audioMeaning.played) {
      audioMeaning.pause();
    }
    if (audioExample.played) {
      audioExample.pause();
    }
  };

  const turnOffIsArrMusic = () => {
    const [...arr] = [...isArrMusic];
    arr[ind] = false;
    setIsArrMusic(arr);
  };

  const turnOnAudioMeaning = () => {
    audioMeaning.currentTime = 0;
    audioMeaning.play();
  };

  const turnOnAudioExample = () => {
    audioExample.currentTime = 0;
    audioExample.play();
  };

  useEffect(() => {
    if (!isArrMusic[ind]) {
      turnOffMusic();
    }
  }, [isArrMusic[ind]]);

  useEffect(() => {
    audio.addEventListener('ended', turnOnAudioMeaning);
    audioMeaning.addEventListener('ended', turnOnAudioExample);
    audioExample.addEventListener('ended', turnOffIsArrMusic);

    return () => {
      turnOffMusic();
      audio.removeEventListener('ended', turnOnAudioMeaning);
      audioMeaning.removeEventListener('ended', turnOnAudioExample);
      audioExample.removeEventListener('ended', turnOffIsArrMusic);
    };
  }, []);

  useEffect(() => {
    if (isAuth && wordsUser[ind]?.optional?.stats) {
      const stat = wordsUser[ind].optional.stats;
      setNumRA(stat.rightAnswers);
      setNumWA(stat.wrongAnswers);
      setLastAnsw(stat.answers.slice(0));
    }
  }, [wordsUser[ind]]);

  const turnOnOffMusic = () => {
    if (isArrMusic[ind]) {
      turnOffIsArrMusic();
    } else {
      const arr = [];
      for (let i = 0; i < isArrMusic.length; i++) {
        arr.push(false);
      }
      arr[ind] = true;
      setIsArrMusic(arr);

      audio.currentTime = 0;
      audio.play();
    }
  };

  const checkHardOrLearned = (wordsUser) => {
    const userWord = wordsUser[ind];
    if (userWord?.difficulty === "easy") {
      return '';
    }
    if (userWord?.difficulty === "hard") {
      return ' word-card_is_hard';
    }
    return ' word-card_is_learned';
  };

  const returnTextHardBtn = (wordsUser) => {
    const userWord = wordsUser[ind];

    if (userWord?.difficulty === "hard") {
      return 'Удалить из сложных';
    }
    return 'Добавить к сложным';
  };

  const returnTextLearnedBtn = (wordsUser) => {
    const userWord = wordsUser[ind];

    if (userWord?.difficulty === "learned") {
      return 'Удалить из изученных';
    }
    return 'Добавить к изученным';
  };

  const returnUpToDateStat = (date) => {
    if (stat.optional.stats.date !== date) {
      stat.optional.stats.date = date;
      stat.optional.stats.sprint = getDefaultGames();
      stat.optional.stats.audiocall = getDefaultGames();
      stat.optional.stats.all = getDefaultAll();
      stat.optional.stats.graphNewWords.push([
        date, 0
      ]);

      const graphLearnWords = stat.optional.stats.graphLearnedWords;
      let lastValue = 0;

      if (graphLearnWords.length > 0) 
      {
        lastValue = graphLearnWords[graphLearnWords.length - 1][1];
      }
      stat.optional.stats.graphLearnedWords.push([
        date, lastValue
      ]);
    }

    return stat;
  };

  const incLearnedWordsStat = (stat) => {
    stat.optional.stats.all.numberLearnedWords++;
    const arrLWords = stat.optional.stats.graphLearnedWords;
    arrLWords[arrLWords.length - 1][1]++;
  };

  const decLearnedWordsStat = (stat) => {
    if (stat.optional.stats.all.numberLearnedWords > 0) {
      stat.optional.stats.all.numberLearnedWords--;
    }
    const arrLWords = stat.optional.stats.graphLearnedWords;
    arrLWords[arrLWords.length - 1][1]--;
  };

  const incNewWordsStat = (stat) => {
    stat.optional.stats.all.numberNewWords++;
    const arrLWords = stat.optional.stats.graphNewWords;
    arrLWords[arrLWords.length - 1][1]++;
  }

  const clickBtnHard = async () => {
    setIsBlockBtns(true);

    const date = (new Date()).toDateString();
    const userWord = wordsUser[ind];

    if (group === 'hard') {
      //======================================
      userWord.difficulty = 'easy';
      userWord.optional.stats.answers = [];

      const answer = await updateSafeWordData(word.id, userWord);

      if (answer === 'error') {
        setIsAuth(false);
        localStorage.clear();
        return;
      }

      setWords(words.slice(0, ind).concat(words.slice(ind + 1)));
      setWordsUser(wordsUser.slice(0, ind).concat(wordsUser.slice(ind + 1)));

    } else if (group !== 'hard' && userWord?.difficulty === 'hard') {
      //======================================
      userWord.difficulty = 'easy';
      userWord.optional.stats.answers = [];

      const answer = await updateSafeWordData(word.id, userWord);

      if (answer === 'error') {
        setIsAuth(false);
        localStorage.clear();
        return;
      }

      setWordsUser(wordsUser);
      setLastAnsw([]);

      const newArr = wordsPagPerPage.slice(0);
      newArr[page - 1]--;
      setWordsPagPerPage(newArr);

    } else if (userWord?.difficulty === 'learned') {
      //======================================
      userWord.difficulty = 'hard';
      userWord.optional.stats.answers = [];

      const answer = await updateSafeWordData(word.id, userWord);

      if (answer === 'error') {
        setIsAuth(false);
        localStorage.clear();
        return;
      }

      setWordsUser(wordsUser);
      setLastAnsw([]);

      let newStat = returnUpToDateStat(date);
      decLearnedWordsStat(newStat);
      putGeneralStat(newStat);
      setStat(newStat);

    } else { //easy
      //======================================
      userWord.difficulty = 'hard';
      const isNewWord = userWord.optional.stats ? false : true;

      let answer;
      if (isNewWord) {
        userWord.optional = {
          stats: {
            rightAnswers: 0,
            wrongAnswers: 0,
            answers: []
          }
        };
        answer = await createSafeWordData(word.id, userWord);
      } else {
        answer = await updateSafeWordData(word.id, userWord);
      }

      if (answer === 'error') {
        setIsAuth(false);
        localStorage.clear();
        return;
      }

      setWordsUser(wordsUser);

      const newArr = wordsPagPerPage.slice(0);
      newArr[page - 1]++;
      setWordsPagPerPage(newArr);

      if (isNewWord) {
        let newStat = returnUpToDateStat(date);
        incNewWordsStat(newStat);
        putGeneralStat(newStat);
        setStat(newStat);
      }
    }


    setIsBlockBtns(false);
  };

  const clickBtnLearned = async () => {
    setIsBlockBtns(true);

    const date = (new Date()).toDateString();
    const userWord = wordsUser[ind];

    if (group === 'hard') {
      //======================================
      userWord.difficulty = 'learned';

      const answer = await updateSafeWordData(word.id, userWord);

      if (answer === 'error') {
        setIsAuth(false);
        localStorage.clear();
        return;
      }

      setWords(words.slice(0, ind).concat(words.slice(ind + 1)));
      setWordsUser(wordsUser.slice(0, ind).concat(wordsUser.slice(ind + 1)));

      let newStat = returnUpToDateStat(date);
      incLearnedWordsStat(newStat);
      putGeneralStat(newStat);
      setStat(newStat);

    } else if (group !== 'hard' && userWord?.difficulty === 'hard') {
      //======================================
      userWord.difficulty = 'learned';

      const answer = await updateSafeWordData(word.id, userWord);

      if (answer === 'error') {
        setIsAuth(false);
        localStorage.clear();
        return;
      }

      setWordsUser(wordsUser);

      let newStat = returnUpToDateStat(date);
      incLearnedWordsStat(newStat);
      putGeneralStat(newStat);
      setStat(newStat);

    } else if (userWord?.difficulty === 'learned') {
      //======================================
      userWord.difficulty = 'easy';
      userWord.optional.stats.answers = [];

      const answer = await updateSafeWordData(word.id, userWord);

      if (answer === 'error') {
        setIsAuth(false);
        localStorage.clear();
        return;
      }

      setWordsUser(wordsUser);
      setLastAnsw([]);

      const newArr = wordsPagPerPage.slice(0);
      newArr[page - 1]--;
      setWordsPagPerPage(newArr);

      let newStat = returnUpToDateStat(date);
      decLearnedWordsStat(newStat);
      putGeneralStat(newStat);
      setStat(newStat);

    } else { //easy
      //======================================
      userWord.difficulty = 'learned';
      const isNewWord = userWord.optional.stats ? false : true;

      let answer;
      if (isNewWord) {
        userWord.optional = {
          stats: {
            rightAnswers: 0,
            wrongAnswers: 0,
            answers: []
          }
        };
        answer = await createSafeWordData(word.id, userWord);
      } else {
        answer = await updateSafeWordData(word.id, userWord);
      }

      if (answer === 'error') {
        setIsAuth(false);
        localStorage.clear();
        return;
      }

      setWordsUser(wordsUser);

      const newArr = wordsPagPerPage.slice(0);
      newArr[page - 1]++;
      setWordsPagPerPage(newArr);

      if (isNewWord) {
        let newStat = returnUpToDateStat(date);
        incNewWordsStat(newStat);
        incLearnedWordsStat(newStat);
        putGeneralStat(newStat);
        setStat(newStat);
      }
    }

    setIsBlockBtns(false);
  };

  return (
    <div className={`words__word word-card${isAuth ?checkHardOrLearned(wordsUser) : ''}`}>
      <div className='word-card__picture' style={{backgroundImage: `url(${basePath}${word.image})`}}></div>

      <div className='word-card__desc'>
        <div className='word-card__title-block'>
          <h2 className='word-card__title'>{word.word}</h2>
          <span className='word-card__transcript'>{word.transcription}</span>
          <button className='word-card__btn-sound'
            onClick={turnOnOffMusic}
          >
            {
              isArrMusic[ind]
              ? <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
                </svg>
              : <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                </svg>
            }
          </button>
        </div>
        <div className='word-card__title-translate'>{word.wordTranslate}</div>

        {
          isAuth
          ? <div className='word-card__stat-all'>
              <div className='word-card__stat-right'>
                {numRA}
              </div>

              <div className='word-card__stat-wrong'>
                {numWA}
              </div>
            </div>
          : ''
        }

        {
          isAuth
          ? <div className={lastAnsw.length === 0? 'word-card__last-answers word-card__last-answers_is_hidden' : 'word-card__last-answers'}>
              {lastAnsw.map((answ, ind) => 
                <div key={ind} className={answ ? 'word-card__last-answers-right' : 'word-card__last-answers-wrong'}></div>
              )}
            </div>
          : ''
        }

        <p className='word-card__def' dangerouslySetInnerHTML={{__html: word.textMeaning}}></p>
        <p className='word-card__def-translate'>{word.textMeaningTranslate}</p>

        <p className='word-card__example' dangerouslySetInnerHTML={{__html: word.textExample}}></p>
        <p className='word-card__example-translate'>{word.textExampleTranslate}</p>

        {
          isAuth
          ? <div className='word-card__controls'>
              <button
                className={isBlockBtns ? 'word-card__btn-hard word-card__btn-hard_is_disabled' : 'word-card__btn-hard'}
                onClick={clickBtnHard}
              >
                {returnTextHardBtn(wordsUser)}
              </button>
              <button
                className={isBlockBtns ? 'word-card__btn-learned word-card__btn-learned_is_disabled' : 'word-card__btn-learned'}
                onClick={clickBtnLearned}
              >
                {returnTextLearnedBtn(wordsUser)}
              </button>
            </div>
          : ''
        }
      </div>
    </div>
  );
};

export default WordCard;
