export function getDefaultStat(currDate) {
  return {
    "stats": {
      "date": currDate,
      "sprint": {
          "numberNewWords": 0,
          "longestBingo": 0,
          "numberRightAnswers": 0,
          "numberAllAnswers": 0
      },
      "audiocall": {
          "numberNewWords": 0,
          "longestBingo": 0,
          "numberRightAnswers": 0,
          "numberAllAnswers": 0
      },
      "all": {
          "numberNewWords": 0,
          "numberLearnedWords": 0,
          "numberRightAnswers": 0,
          "numberAllAnswers": 0
      },
      "graphNewWords": [
        [
          currDate, 0
        ]
      ],
      "graphLearnedWords": [
        [
          currDate, 0
        ]
      ]
    }
  }
}

export function getDefaultGames() {
  return {
    "numberNewWords": 0,
    "longestBingo": 0,
    "numberRightAnswers": 0,
    "numberAllAnswers": 0
  };
}

export function getDefaultAll() {
  return {
    "numberNewWords": 0,
    "numberLearnedWords": 0,
    "numberRightAnswers": 0,
    "numberAllAnswers": 0
  };
}