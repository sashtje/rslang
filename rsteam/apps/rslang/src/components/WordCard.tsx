import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/index';

const WordCard = ({word, isArrMusic, setIsArrMusic, ind}) => {
  const basePath = 'https://react-learnwords-rs.herokuapp.com/';
  const {isAuth, setIsAuth} = useContext(AuthContext);

  const [audio] = useState(new Audio(`${basePath}${word.audio}`));
  const [audioMeaning] = useState(new Audio(`${basePath}${word.audioMeaning}`));
  const [audioExample] = useState(new Audio(`${basePath}${word.audioExample}`));

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

  {/* word-card_is_hard */}
  {/* word-card_is_learned */}
  return (
    <div className='words__word word-card'>
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

        <p className='word-card__def' dangerouslySetInnerHTML={{__html: word.textMeaning}}></p>
        <p className='word-card__def-translate'>{word.textMeaningTranslate}</p>

        <p className='word-card__example' dangerouslySetInnerHTML={{__html: word.textExample}}></p>
        <p className='word-card__example-translate'>{word.textExampleTranslate}</p>

        {
          isAuth
          ? <div className='word-card__controls'>
              <button className='word-card__btn-hard'>Добавить к сложным</button>
              <button className='word-card__btn-learned'>Добавить к изученным</button>
            </div>
          : ''
        }
      </div>
    </div>
  );
};

export default WordCard;