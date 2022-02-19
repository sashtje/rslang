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

//only for tests
export function getTestStat() {
  return {"optional": {
    "stats": {
      "date": 'Sat Feb 19 2022',
      "sprint": {
          "numberNewWords": 5,
          "longestBingo": 4,
          "numberRightAnswers": 50,
          "numberAllAnswers": 50
      },
      "audiocall": {
          "numberNewWords": 7,
          "longestBingo": 3,
          "numberRightAnswers": 50,
          "numberAllAnswers": 60
      },
      "all": {
          "numberNewWords": 9,
          "numberLearnedWords": 10,
          "numberRightAnswers": 30,
          "numberAllAnswers": 50
      },
      "graphNewWords": [
        [
          'Tue Feb 1 2022', 50
        ],
        [
          'Thu Feb 3 2022', 70
        ],
        [
          'Sat Feb 5 2022', 1000
        ],
        [
          'Mon Feb 14 2022', 40
        ],
        [
          'Sat Feb 19 2022', 0
        ]
      ],
      "graphLearnedWords": [
        [
          'Mon Jan 31 2022', 30
        ],
        [
          'Thu Feb 17 2022', 70
        ],
        [
          'Sat Feb 19 2022', 90
        ]
      ]
    }
  }
}
}