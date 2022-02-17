import React, { useContext } from 'react';
import { AuthContext } from '../context/index';

const WordCard = ({word}) => {
  const basePath = 'https://react-learnwords-rs.herokuapp.com/';
  const {isAuth, setIsAuth} = useContext(AuthContext);

  console.log(word);

  {/* word-card_is_hard */}
  {/* word-card_is_learned */}
  return (
    <div className='words__word word-card'>
      <div className='word-card__picture' style={{backgroundImage: `url(${basePath}${word.image})`}}></div>

      <div className='word-card__desc'>
        <div className='word-card__title-block'>
          <h2 className='word-card__title'>{word.word}</h2>
          <span className='word-card__transcript'>{word.transcription}</span>
          <button className='word-card__btn-sound'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
              <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
            </svg>
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