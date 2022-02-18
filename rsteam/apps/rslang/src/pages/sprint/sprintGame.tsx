import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const fetchWords = async () => {
  try {
    const response = await axios({
      url: 'https://react-learnwords-rs.herokuapp.com/words?group=0&page=0',
      headers: { accept: 'application/json' },
    });
    const data = await response.data;
  } catch (error) {
    console.log('error');
  } finally {
    console.log('finally');
  }
};

const SprintGame = () => {
  let { chosenLvl } = useParams();
  const [wordsLoaded, setWordsLoaded] = useState(false);
  let [totalScore, setTotalScore] = useState(0);
  let [questionId, setQuestionId] = useState(0);
  const [qOne, setqOne] = useState({eng:'', ru:''});
  const [qTwo, setqTwo] = useState('');
  const [qTwoId, setqTwoId] = useState(-1);

  let [pointerClass, setPointerClass] = useState('');
  const [roundEnded, setRoundEnded] = useState(false);
  const [timer, setTimer] = useState(60);

  let myTimer;

  useEffect(() => {
    startGame();
  }, []);

  if (roundEnded) {
    return (
      <div className="sprint__wrapper">usagduasgdfuysdgfuy</div>
    )
  }

  return (
    <div className="sprint__wrapper">
      <div className="sprintGame__container">
        <div className="sprintGame__topLine">
          <div className="sprintGame-timer">{timer}</div>

          <div className={`sprintGame-pointer ${pointerClass}`}></div>

          <div className="sprintGame-score">{totalScore}</div>
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

  async function newRound() {
    try {
      const response = await axios({
        url: `https://react-learnwords-rs.herokuapp.com/words?group=0&page=0`,
        headers: { accept: 'application/json' },
      });
      const data = await response.data;
      setqOne({eng: data[questionId].word, ru: data[questionId].wordTranslate})
      setqTwo(data[Math.floor(Math.random() * 20)].wordTranslate)
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

    if (questionId < 5) {
      newRound()
    } else {
      setRoundEnded(true)
    }
  }

  function startGame() {
    startTimer()
    newRound()
  }

  function startTimer() {
    myTimer = setInterval(countDown, 1000);
  }

  function countDown() {
    let newSeconds = timer - 1;
    setTimer(timer - 1)
    
  }

  function roundWin() {
    setTotalScore(totalScore += 10);
    setQuestionId(questionId += 1)
    setPointerClass('correct')
  }

  function roundLose() {
    setQuestionId(questionId += 1)
    setPointerClass('wrong')
  }

  
};

export default SprintGame;
