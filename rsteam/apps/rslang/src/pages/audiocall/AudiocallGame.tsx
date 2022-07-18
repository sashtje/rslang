import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {drawLives, getNewPage, playAudio, createOptions} from "./AudioCallApi";
import AudioCallItem from "./AudioCallItem";

const AudiocallGame = () => {
  const [lives, setLives] = useState(5);
  const [seconds, setSeconds] = useState(10);
  let { chosenLvl } = useParams();
  const [pages, setPage] = useState({currentPage: undefined, pagesVisited: []})
  let [questionNum, setQuestionNum] = useState(0)
  const [questionPack, setQuestionPack] = useState([])

  const basePath = 'https://react-learnwords-rs.herokuapp.com/';
  const [audio, setAudio] = useState(undefined);
  const [allQuestionsPlayed, setAllQuestionsPlayed] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(undefined)
  const [wins, setWins] = useState([])
  const [loses, setLoses] = useState([])
  const [options, setOptions] = useState(undefined)



  useEffect(() => {
    getNewQuestions();
  }, []);

  // useEffect(() => {
  //   const myTimer = setTimeout(countDown, 1000);
  //   if (seconds < 0) {
  //     clearTimeout(myTimer)
  //     checkAnswer(false)
  //   }
  //   return () => clearTimeout(myTimer)
  // }, [seconds])

  useEffect(() => {
    startGame()
  }, [questionPack]);

  function countDown() {
    const newSeconds = +seconds - 1
    setSeconds(newSeconds)
  }

  function startGame() {

    setQuestionNum(0)
    if (questionPack.length > 0) {
      console.log(questionPack)

      newRound()
    }
  }

  function newRound() {
    setSeconds(10)
    setAudio(new Audio(`${basePath}${questionPack[questionNum].audio}`))
    setCurrentQuestion(questionPack[questionNum]);
    // setOptions(createOptions(questionNum, questionPack, checkAnswer))

  }

  function checkAnswer(bool) {
    if (bool) {
      setWins([...wins, currentQuestion])
      console.log('true')
    } else {
      setLoses([...loses, currentQuestion])
      console.log(lives)
      setLives(+lives-1)
      console.log('false ss')
    }
    setAllQuestionsPlayed([...allQuestionsPlayed, currentQuestion]);

    if (questionNum < 19) {
      setQuestionNum(questionNum+=1);
    } else {
      getNewQuestions();
    }
    newRound()
  }

  async function getNewQuestions() {
    let page = getNewPage(pages.pagesVisited)

    try {
      const response = await axios({
        url: `https://react-learnwords-rs.herokuapp.com/words?group=${chosenLvl}&page=${page}`,
        headers: { accept: 'application/json' },
      });
      const data = await response.data;
      setPage({currentPage: page, pagesVisited: [...pages.pagesVisited, page]})
      setQuestionPack([...data])

    } catch (error) {
      console.log(error);
    }
  }

  if (lives > 0) {
    return (
      <div className="audioGame__wrapper">
        <div className="audioGame__container">
          <div className="audioGame__live-container">
            {drawLives(lives)}
          </div>
          <div className="audioGame__timer">{seconds}</div>
          <div className="audioGame__volumeIcon" onClick={()=>playAudio(audio)}></div>

          <div className="audioGame__options-container">
            {currentQuestion && createOptions(questionNum, questionPack, checkAnswer)}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="audioGame__wrapper">
      <div className="audioGame__container">
        <h1 className="textbook__title">Результаты</h1>
        <div className="sprintStats__mistake_block">
          <p><b>Ошибок</b> <span>{loses.length}</span></p>
          {loses.map((el, id) => {
            return <AudioCallItem key={id} cl='wrong' arr={allQuestionsPlayed} el={el}/>
          })}
        </div>
        <div className="sprintStats__correct_block">
          <p><b>Знаю</b> <span>{wins.length}</span></p>
          {wins.map((el, id) => {
            console.log(el)
            return <AudioCallItem key={id} cl='correct' arr={allQuestionsPlayed} el={el}/>
          })}
        </div>
      </div>
    </div>
  )

}

export default AudiocallGame
