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
  } catch {
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


