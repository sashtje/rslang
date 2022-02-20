import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SprintItem from "./SprintItem";

const SprintGame = () => {
  let { chosenLvl } = useParams();
  let [totalScore, setTotalScore] = useState(0);
  let [questionAmount, setQuestionId] = useState(0);
  const [qOne, setqOne] = useState({eng:'', ru:''});
  const [qTwo, setqTwo] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState({});

  const [pointerClass, setPointerClass] = useState('');
  const [roundEnded, setRoundEnded] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [seconds, setSeconds] = useState(5);
  const [pages, setPage] = useState({currentPage: Math.floor(Math.random() * 30), pagesVisited: []})

  const [wins, setWins] = useState([]);
  const [loses, setLoses] = useState([]);
  const [allData, setAllData] = useState([]);

  function choosePage() {
    setQuestionId(0)
    let v = Math.floor(Math.random() * 30);

    if (!pages.pagesVisited.includes(v)) {
      setPage({ currentPage: v, pagesVisited: [...pages.pagesVisited, v]})
    } else {
      choosePage();
    }
  }

  useEffect(() => {
    choosePage()
    // return clearInterval(myTimer)
  }, []);

  useEffect(() => {
    startGame();
    // return clearInterval(myTimer)
  }, []);

  useEffect(() => {
    const myTimer = setTimeout(countDown, 1000);
    if (seconds < 0) {
      clearTimeout(myTimer)
      setGameEnded(true)
    }
    return () => clearTimeout(myTimer)
  }, [seconds])



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

    const title = winItems.length > loseItems.length ? 'Хороший результат' : 'Результат плохой'

    return (
      <div className="sprint__wrapper">
        <div className="sprintStats__container">
          <h1 className="textbook__title">{title}</h1>

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
      <div className="sprintGame__container">
        <div className="sprintGame__topLine">
          <div className="sprintGame-timer">{seconds}</div>

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
     setRoundEnded(false)
    try {
      const response = await axios({
        url: `https://react-learnwords-rs.herokuapp.com/words?group=${chosenLvl}&page=${pages.currentPage}`,
        headers: { accept: 'application/json' },
      });
      const data = await response.data;
      setAllData([...allData, data[questionAmount]])
      setqOne({eng: data[questionAmount].word, ru: data[questionAmount].wordTranslate})

      const oneOrTwo = Math.floor(Math.random() * 2);
      const answ = oneOrTwo == 0 ? data[questionAmount].wordTranslate : data[Math.floor(Math.random() * 20)].wordTranslate
      setqTwo(answ)

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

    if (questionAmount < 20) {
      newRound()
    } else {
      choosePage()
      setRoundEnded(true)
      newRound()
    }
  }

  function countDown() {
    const newSeconds = +seconds - 1
    setSeconds(newSeconds)
  }


  function startGame() {
    // startTimer()
    newRound()
  }

  function roundWin() {
    setTotalScore(totalScore += 10);
    setQuestionId(questionAmount += 1)
    setWins([...wins, currentQuestion])
    setPointerClass('correct')
  }

  function roundLose() {
    setQuestionId(questionAmount += 1)
    setLoses([...loses, currentQuestion])
    setPointerClass('wrong')
  }
};

export default SprintGame;
