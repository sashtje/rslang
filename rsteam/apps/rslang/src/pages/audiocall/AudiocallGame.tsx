import { useState, useEffect, useContext } from 'react';
import { AuthContext, GameContext } from '../../context';
import AudioCallItem from "./AudioCallItem";
import Loader from '../../components/UI/loader/Loader';
import { fetchSafeFromMenuSprint, fetchSafeFromTextbook, getSafeGeneralStat, getSafeHardWords, fetchSafeFromTextbookAuth, fetchSafeLearnedWords, getSafeInfoAboutWords, putGeneralStat, createSafeWordData, updateSafeWordData } from '../../fetch/fetch';
import {getDefaultStat} from '../../fetch/stats';
import {createOptions, shuffle} from "./AudioCallApi";


const AudiocallGame = () => {
  let {isAuth, setIsAuth} = useContext(AuthContext);
  const {gameSet, setGameSet} = useContext(GameContext);
  const [isLoaded, setIsLoaded] = useState(true);

  let [numSeqRA, setNumSeqRA] = useState(0);
  let [questionAmount, setQuestionId] = useState(-1);
  let [currentQuestion, setCurrentQuestion] = useState({
    word: '',
    wordTranslate: '',
    image: '',
    audio: '',
    new: true,
    userWord: {
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

  const [gameEnded, setGameEnded] = useState(false);

  let [wins, setWins] = useState([]);
  let [loses, setLoses] = useState([]);
  let [allData, setAllData] = useState([]);
  let [numberQ, setNumberQ] = useState(0);

  const [showError, setShowError] = useState(false);
  const [showNotEnoughWords, setShowNotEnoughWords] = useState(false);
  let [showAnswer, setShowAnswer] = useState(false);

  const date = new Date();
  let [stat, setStat] = useState(getDefaultStat(date));

  const basePath = 'https://react-learnwords-rs.herokuapp.com/';
  let [audio, setAudio] = useState(undefined);

  let [options, setOptions] = useState(['Слово1', 'Слово2', 'Слово3', 'Слово4', 'Слово5']);
  let [numRightAnsw, setNumRightAnsw] = useState(-1);
  let [numChosenAnsw, setNumChosenAnsw] = useState(undefined);

  function playAudio(audio) {
    audio.currentTime = 0;
    audio.play();
  }

  useEffect(() => {
    const onKeypress = (e) => {
      e.preventDefault();
      console.log(e);
      console.log(gameEnded, isLoaded, showError, showNotEnoughWords, showAnswer);
      if (gameEnded || isLoaded || showError || showNotEnoughWords) return;

      if (e.code === 'Space') {
        console.log('showAnswer before ', showAnswer);
        console.log('space keydown');
        handlerBtn(undefined);
        console.log('showAnswer after ', showAnswer);
        return;
      }

      if (showAnswer) {
        return;
      }

      if (e.key >= '1' && e.key <= '5') {
        handlerBtn(+e.key);
      }
    };

    document.addEventListener('keydown', onKeypress);

    return () => {
      document.removeEventListener('keydown', onKeypress);
    };
  }, [isLoaded, gameEnded, showError, showNotEnoughWords, showAnswer, options]);

  function setNumberRightAnswer() {
    for (let i = 0; i < options.length; i++) {
      if (options[i] === currentQuestion.wordTranslate) {
        setNumRightAnsw(numRightAnsw = i + 1);
        return;
      }
    }
  }

  function checkAnswer(opt) {
    if (opt === undefined) {
      setNumChosenAnsw(numChosenAnsw = undefined);
      setNumberRightAnswer();
      roundLose();
    } else if (options[opt - 1] === currentQuestion.wordTranslate) {
      setNumChosenAnsw(numChosenAnsw = opt);
      setNumRightAnsw(numRightAnsw = opt);
      roundWin();
    } else {
      setNumChosenAnsw(numChosenAnsw = opt);
      setNumberRightAnswer();
      roundLose();
    }
  }

  function writeWinStat() {
    if (currentQuestion.new) {
      const stats = {
        rightAnswers: 1,
        wrongAnswers: 0,
        answers: [true]
      };
      currentQuestion.userWord.optional.stats = stats;

      stat.stats.audiocall.numberNewWords++;
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

    if (numSeqRA > stat.stats.audiocall.longestBingo) {
      stat.stats.audiocall.longestBingo = numSeqRA;
    }
    stat.stats.audiocall.numberRightAnswers++;
    stat.stats.audiocall.numberAllAnswers++;
    stat.stats.all.numberRightAnswers++;
    stat.stats.all.numberAllAnswers++;
  }

  function roundWin() {
    if (isAuth || localStorage.getItem('token')) {
      writeWinStat();
    }

    setNumSeqRA(numSeqRA += 1);

    setWins(wins = [...wins, currentQuestion]);
  }

  function writeLoseStat() {
    if (currentQuestion.new) {
      const stats = {
        rightAnswers: 0,
        wrongAnswers: 1,
        answers: [false]
      };
      currentQuestion.userWord.optional.stats = stats;

      stat.stats.audiocall.numberNewWords++;
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

    if (numSeqRA > stat.stats.audiocall.longestBingo) {
      stat.stats.audiocall.longestBingo = numSeqRA;
    }
    stat.stats.audiocall.numberAllAnswers++;
    stat.stats.all.numberAllAnswers++;
  }

  function roundLose() {
    if (isAuth || localStorage.getItem('token')) {
      writeLoseStat();
    }

    setNumSeqRA(numSeqRA = 0);
    setLoses(loses = [...loses, currentQuestion]);
  }

  function nextQuestion() {
    setQuestionId(questionAmount += 1);

    if (questionAmount === numberQ) {
      setGameEnded(true);
      return;
    }

    setCurrentQuestion(currentQuestion = allData[questionAmount]);

    setOptions(options = createOptions(questionAmount, allData, numberQ));

    setAudio(audio = new Audio(`${basePath}${currentQuestion.audio}`));

    playAudio(audio);
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
            const learnedWords = await fetchSafeLearnedWords(gameSet.group);

            data = data.filter((item) => isNotInclude(learnedWords, item));
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

    setAllData(allData = (data as any[]));

    setNumberQ(numberQ = allData.length);

    setIsLoaded(false);

    nextQuestion();
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

  const handlerBtn = (opt) => {
    if (showAnswer) {
      if (opt === undefined) {
        nextQuestion();
        setShowAnswer(showAnswer = false);
      }
    } else {
      checkAnswer(opt);
      setShowAnswer(showAnswer = true);
    }
  };

  function returnClassOption(showAnswer, num) {
    if (!showAnswer) {
      return 'audioGame__option-number';
    }

    if (num === numRightAnsw) {
      return 'audioGame__option-number audioGame__option-number-right';
    }

    if (num === numChosenAnsw) {
      return 'audioGame__option-number audioGame__option-number-wrong';
    }

    return 'audioGame__option-number';
  }

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
      <div className="audioGame__wrapper">
        <div className="audioGame__container">
          <h1 className="sprintStats__title">
            {wins.length > loses.length ? 'Молодец' : 'Попробуй ещё раз'}
          </h1>
          <div className="sprintStats__mistake_block">
            <p><b>Ошибок</b> <span>{loses.length}</span></p>
            {loses.map((el, id) => <AudioCallItem key={id} cl='wrong' arr={[]} el={el}/>
            )}
          </div>
          <div className="sprintStats__correct_block">
            <p><b>Знаю</b> <span>{wins.length}</span></p>
            {wins.map((el, id) => <AudioCallItem key={id} cl='correct' arr={[]} el={el}/>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="audioGame__wrapper">
      <div className="audioGame__container">
        {
          showAnswer
          ? <div className='audioGame__answer'>
              <div className='audioGame__answer-photo'>
                <img src={`${basePath}${currentQuestion.image}`} alt="current word" />
              </div>
              <div className='audioGame__answer-word'>
                <span
                  className='audioGame__answer-volume'
                  onClick={() => playAudio(audio)}
                ></span>
                {currentQuestion.word}
              </div>
            </div>
          : <div className="audioGame__volumeIcon"
              onClick={() => playAudio(audio)}
            ></div>
        }

        <div className="audioGame__options-container">
          <div className="audioGame__option"
            onClick={() => {handlerBtn(1)}}
          >
            <span className={returnClassOption(showAnswer, 1)}
            >1</span>
            {options[0]}
          </div>

          <div className="audioGame__option"
            onClick={() => {handlerBtn(2)}}
          >
            <span className={returnClassOption(showAnswer, 2)}>2</span>
            {options[1]}
          </div>

          <div className="audioGame__option"
            onClick={() => {handlerBtn(3)}}
          >
            <span className={returnClassOption(showAnswer, 3)}>3</span>
            {options[2]}
          </div>

          <div className="audioGame__option"
            onClick={() => {handlerBtn(4)}}
          >
            <span className={returnClassOption(showAnswer, 4)}>4</span>
            {options[3]}
          </div>

          <div className="audioGame__option"
            onClick={() => {handlerBtn(5)}}
          >
            <span className={returnClassOption(showAnswer, 5)}>5</span>
            {options[4]}
          </div>
        </div>

        <button
          className='btn audioGame__btn'
          onClick={() => {handlerBtn(undefined)}}
        >
          {showAnswer
            ? <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
            </svg>
            : <span>Не знаю</span>
          }
        </button>
      </div>
    </div>
  );
};

export default AudiocallGame;
