import axios from 'axios';
import { getDefaultStat, getDefaultGames, getDefaultAll } from './stats';

const getNewToken = async () => {
  const userId = localStorage.getItem('userId');
  const refreshToken = localStorage.getItem('refreshToken');

  const response = await axios({
    url: `https://react-learnwords-rs.herokuapp.com/users/${userId}/tokens`,
    method: 'get',
    headers: {
      "accept" : "application/json",
      "Authorization": `Bearer ${refreshToken}`
    }
  });

  const data = await response.data;

  localStorage.setItem('token', data.token);
  localStorage.setItem('refreshToken', data.refreshToken);
  localStorage.setItem('userId', data.userId);
  localStorage.setItem('name', data.name);
};

const tryPutGeneralStat = async (stat) => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  delete stat.id;

  try {
    const response = await axios({
      url: `https://react-learnwords-rs.herokuapp.com/users/${userId}/statistics`,
      method: 'put',
      headers: {
        "accept" : "application/json",
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      data: stat
    });

    const data = await response.data;

    return data;
  } catch {
    return 'error';
  }
};

const askForStat = async () => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  try {
    const response = await axios({
      url: `https://react-learnwords-rs.herokuapp.com/users/${userId}/statistics`,
      method: 'get',
      headers: {
        "accept" : "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await response.data;

    return data;
  } catch (err) {
    if (err.message.includes('404')) {
      return {
        "learnedWords": 0,
        "optional": {}
      }
    }
    return 'error';
  }
};


//return obj stat with statistics or 'error' if error occured
const getGeneralStat = async () => {
  try {
    let stat = await askForStat();

    if (stat !== 'error') {
      return stat;
    }

    await getNewToken();

    stat = await askForStat();
    return stat;
  } catch {
    return 'error';
  }
};

export const getInfoAboutWords = async (words) => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  console.log('getInfoAboutWords words ',words);

  try {
    const response = await Promise.allSettled(words.map((word) => axios({
      url: `https://react-learnwords-rs.herokuapp.com/users/${userId}/words/${word.id}`,
      method: 'get',
      headers: {
        "accept" : "application/json",
        "Authorization": `Bearer ${token}`
      }
    })));

    console.log('getInfoAboutWords response ', response);

    const data = response.map((res) => {
      if (res.status === 'fulfilled') {
        return res.value.data;
      } else {
        if (res.reason.response.status === 401) {
          throw new Error();
        }
        return {
            "difficulty": "easy",
            "optional": {}
        };
      }
    });

    console.log('getInfoAboutWords ', data);

    return data;
  } catch {
    return 'error';
  }
};

export const getHardWords = async () => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  try {
    const response = await axios({
      url: `https://react-learnwords-rs.herokuapp.com/users/${userId}/aggregatedWords?wordsPerPage=3600&filter={"userWord.difficulty":"hard"}`,
      method: 'get',
      headers: {
        "accept" : "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await response.data[0].paginatedResults;

    console.log('getHardWords ', data);

    return data;
  } catch {
    return 'error';
  }
};

export const getInfoAboutAllPages = async (group) => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  try {
    const arrPromises = [];
    for (let page = 0; page < 30; page++) {
      arrPromises.push(
        axios({
          url: `https://react-learnwords-rs.herokuapp.com/users/${userId}/aggregatedWords?wordsPerPage=3600&filter={"$and":[{"page":${page}},{"group":${group}},{"$or":[{"userWord.difficulty":"hard"},{"userWord.difficulty":"learned"}]}]}`,
          method: 'get',
          headers: {
            "accept" : "application/json",
            "Authorization": `Bearer ${token}`
          }
        })
      );
    }
    const response = await Promise.allSettled(arrPromises);

    console.log('getInfoAboutAllPages response ', response);

    const data = response.map((res) => {
      if (res.status === 'fulfilled') {
        return res.value.data[0].paginatedResults.length;
      } else {
        if (res.reason.response.status === 401) {
          throw new Error();
        }
        return 0;
      }
    });

    console.log('getInfoAboutAllPages ', data);

    return data;
  } catch {
    return 'error';
  }
};

const updateWordData = async (wordId, wordData) => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  delete wordData.id;
  delete wordData.wordId;

  console.log(wordData);

  try {
    const response = await axios({
      url: `https://react-learnwords-rs.herokuapp.com/users/${userId}/words/${wordId}`,
      method: 'put',
      headers: {
        "accept" : "application/json",
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      data: wordData
    });

    const data = await response.data;

    return data;
  } catch {
    return 'error';
  }
};

const createWordData = async (wordId, wordData) => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  try {
    const response = await axios({
      url: `https://react-learnwords-rs.herokuapp.com/users/${userId}/words/${wordId}`,
      method: 'post',
      headers: {
        "accept" : "application/json",
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      data: wordData
    });

    const data = await response.data;

    return data;
  } catch {
    return 'error';
  }
};

//=============   API   ========================
export const putGeneralStat = async (statObj) => {
  try {
    let stat = await tryPutGeneralStat(statObj);

    if (stat !== 'error') {
      return stat;
    }

    await getNewToken();

    stat = await tryPutGeneralStat(statObj);
    return stat;
  } catch {
    return 'error';
  }
};

export const getSafeGeneralStat = async (currDate, sendToServer = false) => {
  const stat = await getGeneralStat();
  if (stat === "error") {
    return stat;
  }

  if (stat.optional?.stats === undefined) {
    stat.optional = getDefaultStat(currDate);
    if (sendToServer) {
      putGeneralStat(stat);
    }
  } else if (stat.optional.stats.date !== currDate) {
    stat.optional.stats.date = currDate;
    stat.optional.stats.sprint = getDefaultGames();
    stat.optional.stats.audiocall = getDefaultGames();
    stat.optional.stats.all = getDefaultAll();
    stat.optional.stats.graphNewWords.push([
      currDate, 0
    ]);

    const graphLearnWords = stat.optional.stats.graphLearnedWords;
    let lastValue = 0;

    if (graphLearnWords.length > 0) 
    {
      lastValue = graphLearnWords[graphLearnWords.length - 1][1];
    }
    stat.optional.stats.graphLearnedWords.push([
      currDate, lastValue
    ]);

    if (sendToServer) {
      putGeneralStat(stat);
    }
  }

  return stat;
};

export const getSafeInfoAboutWords = async (words) => {
  try {
    let wordsInfo = await getInfoAboutWords(words);

    if (wordsInfo !== 'error') {
      return wordsInfo;
    }

    await getNewToken();

    wordsInfo = await getInfoAboutWords(words);
    return wordsInfo;
  } catch {
    return 'error';
  }
};

export const getSafeHardWords = async () => {
  try {
    let hardWords = await getHardWords();

    if (hardWords !== 'error') {
      return hardWords;
    }

    await getNewToken();

    hardWords = await getHardWords();
    return hardWords;
  } catch {
    return 'error';
  }
};

export const getSafeInfoAboutAllPages = async (group) => {
  try {
    let infoPages = await getInfoAboutAllPages(group);

    if (infoPages !== 'error') {
      return infoPages;
    }

    await getNewToken();

    infoPages = await getInfoAboutAllPages(group);
    return infoPages;
  } catch {
    return 'error';
  }
};

export const updateSafeWordData = async (wordId, wordData) => {
  try {
    let answ = await updateWordData(wordId, wordData);

    if (answ !== 'error') {
      return answ;
    }

    await getNewToken();

    answ = await updateWordData(wordId, wordData);
    return answ;
  } catch {
    return 'error';
  }
};

export const createSafeWordData = async (wordId, wordData) => {
  try {
    let answ = await createWordData(wordId, wordData);

    if (answ !== 'error') {
      return answ;
    }

    await getNewToken();

    answ = await createWordData(wordId, wordData);
    return answ;
  } catch {
    return 'error';
  }
};