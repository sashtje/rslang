import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import SprintItem from "./SprintItem";
import { AuthContext, GameContext } from '../../context';
import Loader from '../../components/UI/loader/Loader';

const SprintGame = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);
  const {gameSet, setGameSet} = useContext(GameContext);
  const [isLoaded, setIsLoaded] = useState(true);

  let [totalScore, setTotalScore] = useState(0);
  let [baseScore, setBaseScore] = useState(10);
  let [numSeqRA, setNumSeqRA] = useState(0);
  let [questionAmount, setQuestionId] = useState(0);
  let [qOne, setqOne] = useState({eng: '', ru: ''});
  let [qTwo, setqTwo] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState({});

  const [pointerClass, setPointerClass] = useState('');
  const [borderClass, setBorderClass] = useState('');

  const [roundEnded, setRoundEnded] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [pages, setPage] = useState({currentPage: Math.floor(Math.random() * 30), pagesVisited: []})

  const [wins, setWins] = useState([]);
  const [loses, setLoses] = useState([]);
  const [allData, setAllData] = useState([]);

  const [audioRight] = useState(new Audio('./assets/sound/right.mp3'));
  const [audioWrong] = useState(new Audio('./assets/sound/wrong.mp3'));
  const [audioRound] = useState(new Audio('./assets/sound/round.mp3'));

  useEffect(() => {
    const onKeypress = (e) => {
      if (gameEnded) return;

      if (e.code === 'ArrowLeft') {
        checkAnswer(false);
        return;
      }
      
      if (e.code === 'ArrowRight') {
        checkAnswer(true);
        return;
      }
    };

    document.addEventListener('keydown', onKeypress);

    return () => {
      document.removeEventListener('keydown', onKeypress);
    };
  }, []);

  function countDown() {
    const newSeconds = +seconds - 1;
    setSeconds(newSeconds);
  }

  useEffect(() => {
    if (isLoaded) return;

    const myTimer = setTimeout(countDown, 1000);
    if (seconds < 0) {
      clearTimeout(myTimer);
      setGameEnded(true);
    }
    return () => clearTimeout(myTimer);
  }, [seconds]);


  
  useEffect(() => {
    startGame();
  }, []);

  async function newRound() {
    setRoundEnded(false)
    try {
      const response = await axios({
        url: `https://react-learnwords-rs.herokuapp.com/words?group=0&page=${pages.currentPage}`,
        headers: { accept: 'application/json' },
      });
      const data = await response.data;
      setAllData([...allData, data[questionAmount]])
      setqOne({eng: data[questionAmount].word, ru: data[questionAmount].wordTranslate});
      qOne = {eng: data[questionAmount].word, ru: data[questionAmount].wordTranslate};

      const oneOrTwo = Math.floor(Math.random() * 2);
      const answ = oneOrTwo == 0 ? data[questionAmount].wordTranslate : data[Math.floor(Math.random() * 20)].wordTranslate;
      setqTwo(answ);
      qTwo = answ;

      setCurrentQuestion({
        id: data[questionAmount].id,
        eng: data[questionAmount].word,
        ru: data[questionAmount].wordTranslate,
        audio: data[questionAmount].audio
      })

    } catch (error) {
      console.log(error);
    }
  }



  function checkAnswer(bool) {
    if((qOne.ru === qTwo) === bool) {
      roundWin();
    } else {
      roundLose();
    }
  }

  


  function startGame() {
    newRound()
  }

  function removeClasses() {
    setTimeout(() => {
      setPointerClass('');
      setBorderClass('');
    }, 200);
  }

  function roundWin() {
    setNumSeqRA(numSeqRA += 1);
    if (numSeqRA % 4 === 0) {
      if (baseScore < 80) {
        setBaseScore(baseScore *= 2);
      }
      audioWrong.pause();
      audioRight.pause();
      audioRound.currentTime = 0;
      audioRound.play();
    } else {
      audioWrong.pause();
      audioRound.pause();
      audioRight.currentTime = 0;
      audioRight.play();
    }

    setTotalScore(totalScore += baseScore);
    setQuestionId(questionAmount += 1);
    setWins([...wins, currentQuestion]);
    setPointerClass('correct');
    setBorderClass('correct');
    removeClasses();
  }

  function roundLose() {
    setBaseScore(baseScore = 10);
    setNumSeqRA(numSeqRA = 0);
    audioRight.pause();
    audioRound.pause();
    audioWrong.currentTime = 0;
    audioWrong.play();
    setQuestionId(questionAmount += 1);
    setLoses([...loses, currentQuestion]);
    setPointerClass('wrong');
    setBorderClass('wrong');
    removeClasses();
  }

  if (isLoaded) {
    return (
      <div className='sprint__wrapper'>
        <Loader />
      </div>
    );
  }

  if (gameEnded) {
    const winItems = wins.map((el, id) => {
      return (
        <div key={id} className="sprintStats__correct">
          <b>{el.eng}</b> - {el.ru}
        </div>
      )
    })
    const loseItems = loses.map((el, id) => {
      return (
        <div key={id} className="sprintStats__mistake">
          <b>{el.eng}</b> - {el.ru}
        </div>
      )
    })

    const title = winItems.length > loseItems.length ? 'Молодец' : 'Попробуй ещё раз'

    return (
      <div className="sprint__wrapper">
        <div className="sprintStats__container">
          <h1 className="sprintStats__title">{title}</h1>

          <div className="sprintStats__mistake_block">
            <p><b>Ошибок</b> <span>{loseItems.length}</span></p>
            {loses.map((el, id) => {
              return <SprintItem key={id} cl='wrong' arr={allData} el={el}/>
            })}
          </div>
          <div className="sprintStats__correct_block">
            <p><b>Знаю</b> <span>{winItems.length}</span></p>
            {wins.map((el, id) => {
              return <SprintItem key={id} cl='correct' arr={allData} el={el}/>
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="sprint__wrapper">
      <div className="sprintGame-score">{totalScore}</div>
      <div className={`sprintGame__container ${borderClass}`}>
        <div className="sprintGame__topLine">
          <div className="sprintGame-timer">{seconds}</div>

          <div className={`sprintGame-pointer ${pointerClass}`}></div>
        </div>

        <div className="sprintGame__question">
          <div className="sprintGame__question-eng">{qOne.eng}</div>
          <div className="sprintGame__question-ru">{qTwo}</div>
        </div>

        <div className="sprintGame__answer-container">
          <button className="btn sprintGame__answer-wrong" onClick={() => checkAnswer(false)}>Неверно</button>
          <div className="btn sprintGame__answer-correct" onClick={() => checkAnswer(true)}>Верно</div>
        </div>
      </div>
    </div>
  );
};

export default SprintGame;
