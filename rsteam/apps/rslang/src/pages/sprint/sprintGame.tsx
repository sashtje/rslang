import { useState, useEffect, useContext } from 'react';
import SprintItem from "./SprintItem";
import { AuthContext, GameContext } from '../../context';
import Loader from '../../components/UI/loader/Loader';
import { fetchSafeFromMenuSprint, fetchSafeFromTextbook, getSafeGeneralStat, getSafeHardWords, fetchSafeFromTextbookAuth, fetchSafeLearnedWords, getSafeInfoAboutWords, putGeneralStat, createSafeWordData, updateSafeWordData } from '../../fetch/fetch';
import { shuffle } from '../audiocall/AudioCallApi';
import {getDefaultStat} from '../../fetch/stats';

const SprintGame = () => {
  let {isAuth, setIsAuth} = useContext(AuthContext);
  const {gameSet, setGameSet} = useContext(GameContext);
  const [isLoaded, setIsLoaded] = useState(true);

  let [totalScore, setTotalScore] = useState(0);
  let [baseScore, setBaseScore] = useState(10);

  let [numSeqRA, setNumSeqRA] = useState(0);
  let [questionAmount, setQuestionId] = useState(-1);
  let [qOne, setqOne] = useState({eng: '', ru: ''});
  let [qTwo, setqTwo] = useState('');
  let [currentQuestion, setCurrentQuestion] = useState({new: true, userWord: {
      difficulty: 'easy',
      optional: {
        stats: {
          rightAnswers: 0,
          wrongAnswers: 0,
          answers: []
        }
      }
    }
  });

  const [pointerClass, setPointerClass] = useState('');
  const [borderClass, setBorderClass] = useState('');

  const [gameEnded, setGameEnded] = useState(false);
  const [seconds, setSeconds] = useState(0);

  let [wins, setWins] = useState([]);
  let [loses, setLoses] = useState([]);
  let [allData, setAllData] = useState([]);
  let [numberQ, setNumberQ] = useState(0);

  const [showError, setShowError] = useState(false);
  const [showNotEnoughWords, setShowNotEnoughWords] = useState(false);

  const [audioRight] = useState(new Audio('./assets/sound/right.mp3'));
  const [audioWrong] = useState(new Audio('./assets/sound/wrong.mp3'));
  const [audioRound] = useState(new Audio('./assets/sound/round.mp3'));

  const date = new Date();
  let [stat, setStat] = useState(getDefaultStat(date));

  let myTimer;

  useEffect(() => {
    const onKeypress = (e) => {
      if (gameEnded || isLoaded || showError || showNotEnoughWords) return;

      console.log('hello');

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
  }, [isLoaded, gameEnded, showError, showNotEnoughWords]);

  function countDown() {
    const newSeconds = +seconds - 1;
    setSeconds(newSeconds);
  }

  useEffect(() => {
    if (isLoaded) return;

    myTimer = setTimeout(countDown, 1000);
    if (seconds < 0) {
      clearTimeout(myTimer);
      setGameEnded(true);
    }

    return () => clearTimeout(myTimer);
  }, [seconds]);

  function checkAnswer(bool) {
    if((qOne.ru === qTwo) === bool) {
      roundWin();
    } else {
      roundLose();
    }

    nextQuestion();
  }

  function removeClasses() {
    setTimeout(() => {
      setPointerClass('');
      setBorderClass('');
    }, 200);
  }

  function manageClasses(className) {
    setPointerClass(className);
    setBorderClass(className);
    removeClasses();
  }

  function manageAudio(audPau1, audPau2, audPlay) {
    audPau1.pause();
    audPau2.pause();
    audPlay.currentTime = 0;
    if (audPlay === audioRight) {
      audPlay.volume = 0.3;
    }
    audPlay.play();
  }

  function writeWinStat() {
    if (currentQuestion.new) {
      const stats = {
        rightAnswers: 1,
        wrongAnswers: 0,
        answers: [true]
      };
      currentQuestion.userWord.optional.stats = stats;

      stat.stats.sprint.numberNewWords++;
      stat.stats.all.numberNewWords++;
      stat.stats.graphNewWords[stat.stats.graphNewWords.length - 1][1]++;
    } else {
      currentQuestion.userWord.optional.stats.rightAnswers++;
      const answers = currentQuestion.userWord.optional.stats.answers;
      if (answers.length === 5) {
        answers.shift();
        answers[4] = true;
      } else {
        answers.push(true);
      }

      if (currentQuestion.userWord.difficulty === 'easy' && answers.length >= 3) {
        const copyAns = answers.slice();
        if (copyAns[0] && copyAns[1] && copyAns[2]) {
          currentQuestion.userWord.difficulty = 'learned';
          stat.stats.all.numberLearnedWords++;
          stat.stats.graphLearnedWords[stat.stats.graphLearnedWords.length - 1][1]++;
        }
      } else if (currentQuestion.userWord.difficulty === 'hard' && answers.length === 5) {
        const copyAns = answers.slice();
        if (copyAns.every((elem => elem))) {
          currentQuestion.userWord.difficulty = 'learned';
          stat.stats.all.numberLearnedWords++;
          stat.stats.graphLearnedWords[stat.stats.graphLearnedWords.length - 1][1]++;
        }
      }
    }

    if (numSeqRA > stat.stats.sprint.longestBingo) {
      stat.stats.sprint.longestBingo = numSeqRA;
    }
    stat.stats.sprint.numberRightAnswers++;
    stat.stats.sprint.numberAllAnswers++;
    stat.stats.all.numberRightAnswers++;
    stat.stats.all.numberAllAnswers++;
  }

  function roundWin() {
    if (isAuth || localStorage.getItem('token')) {
      writeWinStat();
    }

    setNumSeqRA(numSeqRA += 1);
    if (numSeqRA % 4 === 0) {
      if (baseScore < 80) {
        setBaseScore(baseScore *= 2);
      }
      manageAudio(audioWrong, audioRight, audioRound);
    } else {
      manageAudio(audioWrong, audioRound, audioRight);
    }

    setTotalScore(totalScore += baseScore);
    setWins(wins = [...wins, currentQuestion]);
    manageClasses('correct');
  }

  function writeLoseStat() {
    if (currentQuestion.new) {
      const stats = {
        rightAnswers: 0,
        wrongAnswers: 1,
        answers: [false]
      };
      currentQuestion.userWord.optional.stats = stats;

      stat.stats.sprint.numberNewWords++;
      stat.stats.all.numberNewWords++;
      stat.stats.graphNewWords[stat.stats.graphNewWords.length - 1][1]++;
    } else {
      currentQuestion.userWord.optional.stats.wrongAnswers++;
      const answers = currentQuestion.userWord.optional.stats.answers;
      if (answers.length === 5) {
        answers.shift();
        answers[4] = false;
      } else {
        answers.push(false);
      }

      if (currentQuestion.userWord.difficulty === 'learned') {
        currentQuestion.userWord.difficulty = 'easy';
        stat.stats.graphLearnedWords[stat.stats.graphLearnedWords.length - 1][1]--;
      }
    }

    if (numSeqRA > stat.stats.sprint.longestBingo) {
      stat.stats.sprint.longestBingo = numSeqRA;
    }
    stat.stats.sprint.numberAllAnswers++;
    stat.stats.all.numberAllAnswers++;
  }

  function roundLose() {
    if (isAuth || localStorage.getItem('token')) {
      writeLoseStat();
    }

    setBaseScore(baseScore = 10);
    setNumSeqRA(numSeqRA = 0);
    manageAudio(audioRight, audioRound, audioWrong);
    setLoses(loses = [...loses, currentQuestion]);
    manageClasses('wrong');
  }

  function nextQuestion() {
    setQuestionId(questionAmount += 1);

    if (questionAmount === numberQ) {
      clearTimeout(myTimer);
      setGameEnded(true);
      return;
    }

    setqOne(qOne = {eng: allData[questionAmount].word, ru: allData[questionAmount].wordTranslate});

    const oneOrTwo = Math.floor(Math.random() * 2);
    const answ = oneOrTwo == 0 ? allData[questionAmount].wordTranslate : allData[Math.floor(Math.random() * numberQ)].wordTranslate;

    setqTwo(qTwo = answ);

    setCurrentQuestion(currentQuestion = allData[questionAmount]);
  }

  function isNotInclude(learnedWords, wordData) {
    return !learnedWords.some((item) => item.word === wordData.word);
  }

  async function startGame() {
    let data;
    const currDate = date.toDateString();
    const st = await getSafeGeneralStat(currDate, true);

    if (st === 'error') {
      setIsAuth(isAuth = false);
      localStorage.clear();
    } else {
      setStat(stat = st.optional);
    }

    if (isAuth || localStorage.getItem('token')) {
      //from Menu
      if (!gameSet.isTxb) {
        data = await fetchSafeFromMenuSprint(gameSet.group);
      } else {
        if (gameSet.group === 6) {
          //from hard Words
          data = await getSafeHardWords();
          data = data.map((item) => {
            item.id = item._id;
            delete item._id;
            item.new = false;
            return item;
          });
        } else {
          //from Textbook
          data = await fetchSafeFromTextbookAuth(gameSet.group, gameSet.page);
          if (data !== 'error') {
            console.log('data before filter ', data);

            const learnedWords = await fetchSafeLearnedWords(gameSet.group);

            console.log('learnedWords ', learnedWords);

            data = data.filter((item) => isNotInclude(learnedWords, item));

            console.log('data after filter ', data);
          }
        }

        if (data !== 'error') {
          data = data.slice(0, 60);

          if (data.length < 5) {
            setIsLoaded(false);
            setShowNotEnoughWords(true);
            return;
          }
        }
      }

    } else {
      //not Auth from Menu
      if (!gameSet.isTxb) {
        data = await fetchSafeFromMenuSprint(gameSet.group);
      } else {
        //not Auth from Textbook
        data = await fetchSafeFromTextbook(gameSet.group, gameSet.page);
      }
    }

    if (data === 'error') {
      setIsLoaded(false);
      setShowError(true);
      return;
    }

    data = shuffle(data);

    if (isAuth || localStorage.getItem('token')) {
      //download data for words
      if (!gameSet.isTxb || gameSet.group !== 6) {
        const wordsData = await getSafeInfoAboutWords(data);

        for (let i = 0; i < data.length; i++) {
          data[i].userWord = wordsData[i];
          if (wordsData[i].optional.stats === undefined) {
            data[i].new = true;
          } else {
            data[i].new = false;
            delete data[i].userWord.id;
            delete data[i].userWord.wordId;
          }
        }
      }
    }
    console.log('data for game ', data);

    setAllData(allData = (data as any[]));

    setNumberQ(numberQ = allData.length);

    nextQuestion();

    setIsLoaded(false);
    setSeconds(allData.length);
  }

  useEffect(() => {
    startGame();
  }, []);

  async function writeWordsStatToServer(item) {
    if (item.new) {
      await createSafeWordData(item.id, item.userWord);
    } else {
      await updateSafeWordData(item.id, item.userWord);
    }
  }

  async function writeStatToServer() {
    const statObj = {
      learnedWords: 0,
      optional: stat
    };
    await putGeneralStat(statObj);
    wins.forEach(await writeWordsStatToServer);
    loses.forEach(await writeWordsStatToServer);
  }

  useEffect(() => {
    if (gameEnded) {
      //transfer all statistics to server
      writeStatToServer();
    }
  }, [gameEnded]);

  if (isLoaded) {
    return (
      <div className='sprint__wrapper'>
        <Loader />
      </div>
    );
  }

  if (showError) {
    return (
      <div className='sprint__wrapper'>
        <div className='sprint__error'>
          Не получается загрузить данные.
        </div>
        <div className='sprint__error'>
          Проверьте своё соединение и перезагрузите страницу. Или авторизуйтесь снова, если хотите чтобы статистика сохранялась.
        </div>
      </div>
    );
  }

  if (showNotEnoughWords) {
    return (
      <div className='sprint__wrapper'>
        <div className='sprint__error'>
          Недостаточно слов чтобы запустить игру.
        </div>
      </div>
    );
  }

  if (gameEnded) {
    return (
      <div className="sprint__wrapper">
        <div className="sprintStats__container">
          <h1 className="sprintStats__title">
            {wins.length > loses.length ? 'Молодец' : 'Попробуй ещё раз'}
          </h1>

          <div className="sprintStats__mistake_block">
            <p><b>Ошибок</b> <span>{loses.length}</span></p>
            {loses.map((el, id) => {
              return <SprintItem key={id} cl='wrong' arr={allData} el={el}/>
            })}
          </div>
          <div className="sprintStats__correct_block">
            <p><b>Знаю</b> <span>{wins.length}</span></p>
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
