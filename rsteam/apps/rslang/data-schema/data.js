// for /users/{id}/words/{wordId}

{
  "difficulty": "easy" | "learned" | "hard",
  "optional": {
    stats: {
      rightAnswers: number, //по мини-играм
      wrongAnswers: number,
      answers: [] //до 5 значений макс. (это ответы в минииграх по этому слову, false - неверный ответ, true - верный ответ, значения добавляются в конец, если значений уже 5 и нужно добавить следующее, удаляем значение из начала массива и добавляем новое в конец)
    }
  }
}

// for /users/{id}/statistics
//Эта статистика добавляется при создании пользователя с текущей датой и нулями (дата состоит только из числа, месяца и года)

{
  "learnedWords": 0, //не трогаем, пусть будет 0
  "optional": {
    "stats": {
      "date": date.toDateString(),
      "sprint": {
          numberNewWords: 0,
          longestBingo: 0, //самая длинная серия правильных ответов
          numberRightAnswers: 0,
          numberAllAnswers: 0 //и правильные и неправильные
      },
      "audiocall": {
          numberNewWords: 0,
          longestBingo: 0, //самая длинная серия правильных ответов
          numberRightAnswers: 0,
          numberAllAnswers: 0 //и правильные и неправильные
      },
      "all": {
          numberNewWords: 0,
          numberLearnedWords: 0,
          numberRightAnswers: 0,
          numberAllAnswers: 0 //и правильные и неправильные
      },
      "graphNewWords": [
        [
          date: numberNewWords
        ],
        ...
      ],
      "graphLearnedWords": [
        [
          date: numberLearnedWords //если слово меняет статус, то вычитаем его из изученных на текущую дату
          // число numberLearnedWords переносится из предыдущей даты в следующую и к нему добавляются все изученные слова за текущий день, либо вычитаются слова перешедшие из статуса изученных в какой-то другой статус
        ],
        ...
      ]
    }
  }
}

//Для дат можно использовать date.toDateString();